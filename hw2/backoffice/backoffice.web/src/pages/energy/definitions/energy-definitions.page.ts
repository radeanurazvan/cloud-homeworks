import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, NotificationMessage, NotificationsService } from '@framework';

import * as template from './energy-definitions.page.html'
import { EnergyService } from '../energy.service';

@TrexPage({
    template: template
})
class EnergyProvider {
    public id: string;
    public name: string;
    public coordinates: {longitude, latitude};

    public constructor(value, private service, private notifications) {
        this.id = value.id;
        this.name = value.name;
        this.coordinates = value.coordinates;
    }

    public async promote(e, model) {
        const pricePerUnit = prompt("Please enter price for unit:");

        try {
            await model.service.promote(model.provider.id, {pricePerUnit});
            model.notifications.pushSuccess(NotificationMessage.success('Definition promoted to catalog'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
    
    public async delete(e, model) {
        await model.service.delete(model.provider.id);
        model.notifications.pushSuccess(NotificationMessage.success('Definition deleted'));
    }
}


@TrexPage({
    template: template
})
export class EnergyDefinitionsPage extends Page implements OnInit {
    public providers: any[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(EnergyService) private service: EnergyService,
        @inject(NotificationsService) private notifications: NotificationsService) {
        super(master);
    }

    public async onInit() {
        await this.updateDefinitions();
        this.service.onChanges.subscribe(() => this.updateDefinitions());
    }

    private async updateDefinitions() {
        const result = await this.service.getDefinitions();
        this.providers = result.map(x => new EnergyProvider(x, this.service, this.notifications)); 
    }
}
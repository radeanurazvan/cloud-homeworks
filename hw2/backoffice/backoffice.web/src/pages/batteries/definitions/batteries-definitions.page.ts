import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, NotificationsService, NotificationMessage } from '@framework';

import * as template from './batteries-definitions.page.html'
import { BatteriesService } from '../batteries.service';

class Battery {
    public id: string;
    public name: string;
    public size: string;

    public constructor(value, private service, private notifications) {
        this.id = value.id;
        this.name = value.name;
        this.size = value.size;
    }

    public async promote(e, model) {
        const price = prompt("Please enter price for the battery:");
        const stock = prompt("Please enter stock for the battery:");

        try {
            await model.service.promote(model.battery.id, {price, stock});
            model.notifications.pushSuccess(NotificationMessage.success('Definition promoted to catalog'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
    
    public async delete(e, model) {
        await model.service.delete(model.battery.id);
        model.notifications.pushSuccess(NotificationMessage.success('Definition deleted'));
    }
}


@TrexPage({
    template: template
})
export class BatteriesDefinitionsPage extends Page implements OnInit {
    public batteries: any[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(BatteriesService) private service: BatteriesService,
        @inject(NotificationsService) private notifications: NotificationsService) {
        super(master);
    }

    public async onInit() {
        await this.updateDefinitions();
        this.service.onChanges.subscribe(() => this.updateDefinitions());
    }

    private async updateDefinitions() {
        const result = await this.service.getDefinitions();
        this.batteries = result.map(x => new Battery(x, this.service, this.notifications)); 
    }
}
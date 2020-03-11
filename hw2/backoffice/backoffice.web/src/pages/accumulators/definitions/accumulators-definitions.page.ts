import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, NotificationsService, NotificationMessage } from '@framework';

import * as template from './accumulators-definitions.page.html'
import { AccumulatorsService } from '../accumulators.service';

class Accumulator {
    public id: string;
    public name: string;
    public size: string;
    public category: string;

    public constructor(value, private service, private notifications) {
        this.id = value.id;
        this.name = value.name;
        this.size = value.size;
        this.category = Accumulator.mapCategory(value.category);
    }

    public async promote(e, model) {
        const price = prompt("Please enter price for the accumulator:");
        const stock = prompt("Please enter stock for the accumulator:");

        try {
            await model.service.promote(model.accumulator.id, {price, stock});
            model.notifications.pushSuccess(NotificationMessage.success('Definition promoted to catalog'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
    
    public async delete(e, model) {
        await model.service.delete(model.accumulator.id);
        model.notifications.pushSuccess(NotificationMessage.success('Definition deleted'));
    }

    private static mapCategory(x) {
        if(x === 1) {
            return "Bike";
        }

        if (x === 2) {
            return "Car";
        }

        if (x === 3) {
            return "Drone";
        }

        return "Other;"
    }
}

@TrexPage({
    template: template
})
export class AccumulatorsDefinitionsPage extends Page implements OnInit {
    public accumulators: Accumulator[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(AccumulatorsService) private service: AccumulatorsService,
        @inject(NotificationsService) private notifications: NotificationsService) {
        super(master);
    }

    public async onInit() {
        await this.updateDefinitions();
        this.service.onChanges.subscribe(() => this.updateDefinitions());
    }

    private async updateDefinitions() {
        const result = await this.service.getDefinitions();
        this.accumulators  = result.map(x => new Accumulator(x, this.service, this.notifications)); 
    }
}
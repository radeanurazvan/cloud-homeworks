import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, NotificationsService, NotificationMessage } from '@framework';

import * as template from './accumulators-catalog.page.html'
import { AccumulatorsService } from '../accumulators.service';

class Accumulator {
    public id: string;
    public name: string;
    public size: string;
    public category: string;

    public price: number;
    public stock: number;

    public constructor(value, private service, private notifications) {
        this.id = value.id;
        this.name = value.name;
        this.size = value.size;
        this.category = Accumulator.mapCategory(value.category);
        this.price = value.price;
        this.stock = value.stock;
    }

    public async changePrice(e, model) {
        const price = prompt("Please enter new price:");
        try {
            await model.service.changePrice(model.accumulator.id, price);
            model.notifications.pushSuccess(NotificationMessage.success('Price changed'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
    
    public async changeStock(e, model) {
        const stock = prompt("Please enter new stock:");
        try {
            await model.service.changeStock(model.accumulator.id, stock);
            model.notifications.pushSuccess(NotificationMessage.success('Stock changed'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
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
export class AccumulatorsCatalogPage extends Page implements OnInit {
    public accumulators: Accumulator[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(AccumulatorsService) private service: AccumulatorsService,
        @inject(NotificationsService) private notifications: NotificationsService) {
        super(master);
    }

    public async onInit() {
        await this.updateCatalog();
        this.service.onChanges.subscribe(() => this.updateCatalog());
    }

    private async updateCatalog() {
        const result = await this.service.getCatalog();
        this.accumulators = result.map(x => new Accumulator(x, this.service, this.notifications)); 
    }
}
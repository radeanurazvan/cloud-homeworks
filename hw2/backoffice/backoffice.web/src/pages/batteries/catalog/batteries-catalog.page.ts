import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, NotificationsService, NotificationMessage } from '@framework';

import * as template from './batteries-catalog.page.html'
import { BatteriesService } from '../batteries.service';

class Battery {
    public id: string;
    public name: string;
    public size: string;
    public price: number;
    public stock: number;

    public constructor(value, private service, private notifications) {
        this.id = value.id;
        this.name = value.name;
        this.size = value.size;
        this.price = value.price;
        this.stock = value.stock;
    }

    public async changePrice(e, model) {
        const price = prompt("Please enter new price:");
        try {
            await model.service.changePrice(model.battery.id, price);
            model.notifications.pushSuccess(NotificationMessage.success('Price changed'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
    
    public async changeStock(e, model) {
        const stock = prompt("Please enter new stock:");
        try {
            await model.service.changeStock(model.battery.id, stock);
            model.notifications.pushSuccess(NotificationMessage.success('Stock changed'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
}


@TrexPage({
    template: template
})
export class BatteriesCatalogPage extends Page implements OnInit {
    public batteries: Battery[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(BatteriesService) private service: BatteriesService,
        @inject(NotificationsService) private notifications: NotificationsService) {
        super(master);
    }

    public async onInit() {
        await this.updateCatalog();
        this.service.onChanges.subscribe(() => this.updateCatalog());
    }

    private async updateCatalog() {
        const result = await this.service.getCatalog();
        this.batteries = result.map(x => new Battery(x, this.service, this.notifications)); 
    }
}
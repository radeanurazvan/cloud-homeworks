import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, RouterService } from '@framework';

import * as template from './orders.page.html'
import { OrdersService } from './orders.service';

@TrexPage({
    template: template
})
export class OrdersPage extends Page implements OnInit {
    public orders: any[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(OrdersService) private service: OrdersService,
        @inject(RouterService) private router: RouterService) {
        super(master);
    }

    public async onInit() {
        const result = await this.service.getAll();
        this.orders = result.map(o => ({
            customer: o.customer.name,
            placedAt: o.placedAt,
            batteries: o.batteries.map(b => `${b.quantity} X ${b.battery.definition.name}`).join(', '),
            accumulators: o.accumulators.map(b => `${b.quantity} X ${b.accumulator.definition.name}`).join(', ')
        }));
    }

    public create(e, self) {
        self.router.goTo('/orders/create');
    }
}
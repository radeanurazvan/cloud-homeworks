import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, RouterService, NotificationsService, NotificationMessage } from '@framework';

import * as template from './create-order.page.html'
import { OrdersService } from '../orders.service';
import { CustomersService } from 'src/pages/customers/customers.service';
import { BatteriesService } from 'src/pages/batteries';
import { AccumulatorsService } from 'src/pages/accumulators';

@TrexPage({
    template: template
})
export class CreateOrderPage extends Page implements OnInit {
    public customers: any[] = [];
    public batteries: any[] = [];
    public accumulators: any[] = [];

    private customerId;
    private orderBatteries = [];
    private orderAccumulators = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(OrdersService) private service: OrdersService,
        @inject(CustomersService) private customersService: CustomersService,
        @inject(BatteriesService) private batteriesService: BatteriesService,
        @inject(AccumulatorsService) private accumulatorsService: AccumulatorsService,
        @inject(RouterService) private router: RouterService,
        @inject(NotificationsService) private notifications: NotificationsService) {
        super(master);
    }

    public async onInit() {
        this.customers = await this.customersService.getAll();
        this.batteries = await this.batteriesService.getCatalog();
        this.accumulators = await this.accumulatorsService.getCatalog();
    }

    public addBattery(e, self: CreateOrderPage) {
        self.orderBatteries.push({id: '', quantity: 1});
    }

    public addAccumulator(e, self: CreateOrderPage) {
        self.orderAccumulators.push({id: '', quantity: 1});
    }

    public async create(e, self: CreateOrderPage) {
        try {
            await self.service.create({
                customerId: self.customerId,
                batteries: self.orderBatteries,
                accumulators: self.orderAccumulators
            });
            self.notifications.pushSuccess(NotificationMessage.success('Order created'));
            self.router.goTo('/orders');
        } catch(e) {
            self.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
    
}
import { Container } from 'inversify';

// For some reason barrel importing all the binded stuff results in undefined continare bindings
import { DomMaster} from '@framework/dom';
import { DomContainer } from '@framework/dom';
import { RouterService } from '@framework/routing';
import { NotificationsService } from '@framework/notifications';
import { BatteriesService } from '../pages/batteries/batteries.service';
import { AccumulatorsService } from '../pages/accumulators/accumulators.service';
import { EnergyService } from 'src/pages/energy/energy.service';
import { CustomersService } from 'src/pages/customers/customers.service';
import { OrdersService } from 'src/pages/orders/orders.service';

const container = new Container();
container.bind<DomMaster>(DomMaster).toSelf();
container.bind<DomContainer>(DomContainer).toSelf();
container.bind<RouterService>(RouterService).toSelf();
container.bind<NotificationsService>(NotificationsService).toSelf();
container.bind<BatteriesService>(BatteriesService).toSelf();
container.bind<AccumulatorsService>(AccumulatorsService).toSelf();
container.bind<EnergyService>(EnergyService).toSelf();
container.bind<CustomersService>(CustomersService).toSelf();
container.bind<OrdersService>(OrdersService).toSelf();

export const trexContainer = container;
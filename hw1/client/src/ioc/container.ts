import { Container } from 'inversify';

// For some reason barrel importing all the binded stuff results in undefined continare bindings
import { DomMaster} from '@framework/dom';
import { DomContainer } from '@framework/dom';
import { RouterService } from '@framework/routing';
import { NotificationsService } from '@framework/notifications';
import { UserService } from 'src/shared/services/user.service';
import { ResourcesService } from 'src/shared/services/resources.service';

const container = new Container();
container.bind<DomMaster>(DomMaster).toSelf();
container.bind<DomContainer>(DomContainer).toSelf();
container.bind<RouterService>(RouterService).toSelf();
container.bind<NotificationsService>(NotificationsService).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<ResourcesService>(ResourcesService).toSelf();

export const trexContainer = container;
import * as template from './sidebar.component.html';
import { TrexComponent, Component, HasInputs, RouterService } from "@framework";
import { Subject } from 'rxjs';
import { inject } from 'inversify';


@TrexComponent({
    selector: 'sidebar',
    template: template
})
export class SidebarComponent extends Component implements HasInputs{
    private channel: Subject<string>;
    public menu = {
        batteries: true,
        accumulators: false,
        energy: false,
        customers: false,
        orders: false
    };

    public constructor(@inject(RouterService) private router) {
        super();
    }

    public gatherInputs(inputs: any, self: SidebarComponent): void {
        this.channel = inputs.channel || new Subject<string>();
        this.setSelectedMenuKey(inputs.selected, self);
    }

    public selected(event: any, self: SidebarComponent) {
        const menuValue = event.target.getAttribute('data-value');
        if(menuValue) {
            self.setSelectedMenuKey(menuValue, self);
            self.channel.next(menuValue);
        }

        const routeValue = event.target.getAttribute('data-route');
        if(routeValue) {
            self.router.goTo(routeValue);
        }
    }

    private setSelectedMenuKey(key: string, self: SidebarComponent) {
        if(!key) {
            return;
        }

        for(var menuKey in self.menu) {
            self.menu[menuKey] = false;
        }
        self.menu[key] = true;
    }
}

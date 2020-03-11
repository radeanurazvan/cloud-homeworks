import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, NotificationsService, NotificationMessage } from '@framework';

import * as template from './customers.page.html'
import { CustomersService } from './customers.service';

class Customer {
    public id: string;
    public name: string;
    public email: string;
    public isLoyal: string;

    public constructor(value, service, notifications) {
        this.id = value.id;
        this.name = value.name;
        this.email = value.email;
        this.isLoyal = value.isLoyal ? 'Yes' : 'No';
    }
    
    public async toggleLoyalty(e, model) {
        try {
            await model.service.toggleLoyalty(model.customer.id);
            model.notifications.pushSuccess(NotificationMessage.success('Loyalty has changed'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
    
    public async delete(e, model) {
        try {
            await model.service.delete(model.customer.id);
            model.notifications.pushSuccess(NotificationMessage.success('Customer has been deleted'));
        } catch(e) {
            model.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }
}

@TrexPage({
    template: template
})
export class CustomersPage extends Page implements OnInit {
    public customers: Customer[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(CustomersService) private service: CustomersService,
        @inject(NotificationsService) private notifications: NotificationsService) {
        super(master);
    }

    public async onInit() {
        await this.updateCustomers();
        this.service.onChanges.subscribe(() => this.updateCustomers());
    }

    public async create(e: Event, self : CustomersPage) {
        const name = prompt("Enter customer name:");
        const email = prompt("Enter customer email:");

        try {
            await self.service.create({name, email});
            self.notifications.pushSuccess(NotificationMessage.success("Customer created"));
        } catch(e) {
            self.notifications.pushError(NotificationMessage.error(e.response.data.error));
        }
    }

    private async updateCustomers() {
        const result = await this.service.getAll();
        this.customers = result.map(x => new Customer(x, this.service, this.notifications)); 
    }

}
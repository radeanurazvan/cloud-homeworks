import * as template from './login-password.component.html';
import { Component, TrexComponent, HasInputs } from "@framework";
import { Subject } from 'rxjs';

@TrexComponent({
    selector: 'login-password',
    template: template
})
export class LoginPasswordComponent extends Component implements HasInputs {
    private channel: Subject<string>;
    public password: string = '';

    public gatherInputs(inputs: any): void {
        this.channel = inputs.channel;
    }

    public submit(e: any, self: LoginPasswordComponent): void {
        self.channel.next(self.password);
    }
}
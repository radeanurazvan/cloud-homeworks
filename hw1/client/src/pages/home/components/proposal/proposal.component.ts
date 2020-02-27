import { TrexComponent, Component, HasInputs } from "@framework";
import * as template from './proposal.component.html';
import { Subject } from "rxjs";

@TrexComponent({
    selector: 'proposal',
    template: template
})
export class ProposalComponent extends Component implements HasInputs {
    private channel: Subject<any>;
    public proposalForm: {
        resource: string,
        title: string,
        description: string,
        link: string,
        provider: string
    } = {
        resource: 'Media',
        title: '',
        description: '',
        link: '',
        provider: 'Youtube',
    };

    public gatherInputs(inputs: any): void {
        this.channel = inputs.channel;
    }

    public submit(e: any, self: ProposalComponent): void {
        self.channel.next(self.proposalForm);
    }
}
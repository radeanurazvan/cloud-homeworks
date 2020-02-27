import * as template from './sidebar.component.html';
import { TrexComponent, Component, HasInputs } from "@framework";
import { Subject } from 'rxjs';
import { UserService } from 'src/shared/services/user.service';
import { inject } from 'inversify';
import { User } from 'src/shared/models/user.model';


@TrexComponent({
    selector: 'sidebar',
    template: template
})
export class SidebarComponent extends Component implements HasInputs{
    private channel: Subject<string>;
    public user: User;

    isDiscoverActive: boolean = true;
    isHistoryActive: boolean = false;
    isSavedActive: boolean = false;
    isProposalsActive: boolean = false;

    public constructor(@inject(UserService) userService: UserService) {
        super();
        this.user = userService.getUser();
    }

    public gatherInputs(inputs: any): void {
        this.channel = inputs.channel;
    }

    public selected(clickedElement: any, self: SidebarComponent) {
        if (clickedElement.path[0].innerText === 'DISCOVER') {
            if(self.isDiscoverActive === false) {
                self.channel.next(clickedElement.path[0].innerText);
                self.isDiscoverActive = true;
                self.isHistoryActive = false;
                self.isProposalsActive = false;
                self.isSavedActive = false;
            }
        }

        if (clickedElement.path[0].innerText === 'HISTORY') {
            if(self.isHistoryActive === false) {
                self.channel.next(clickedElement.path[0].innerText);
                self.isHistoryActive = true;
                self.isProposalsActive = false;
                self.isSavedActive = false;
                self.isDiscoverActive = false;
            }
        }

        if (clickedElement.path[0].innerText === 'SAVED') {
            if(self.isSavedActive === false) {
                self.channel.next(clickedElement.path[0].innerText);
                self.isHistoryActive = false;
                self.isProposalsActive = false;
                self.isSavedActive = true;
                self.isDiscoverActive = false;
            }
        }

        if (clickedElement.path[0].innerText === 'PROPOSALS') {
            if(self.isProposalsActive === false) {
                self.channel.next(clickedElement.path[0].innerText);
                self.isHistoryActive = false;
                self.isProposalsActive = true;
                self.isSavedActive = false;
                self.isDiscoverActive = false;
            }
        }
    }
}

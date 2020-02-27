import { TrexComponent, Component, RouterService } from "@framework";
import * as template from './twitter-preview.component.html';
import { inject } from "inversify";

@TrexComponent({
    selector: 'twitter-preview',
    template: template
})
export class TwitterPreviewComponent extends Component {
    public title: string;
    public description: string;
    public tags: string[];
    public id: string;

    public constructor(
        @inject(RouterService) private routerService: RouterService) {

        super();
    }

    public gatherInputs(inputs: any): void {
        this.title = inputs.twitter.title;
        this.description = inputs.twitter.description;
        this.tags = inputs.twitter.tags;
        this.id = inputs.twitter.id;
    }

    public goToTwitterArticle(e: any, self: TwitterPreviewComponent): void {
        self.routerService.goTo(`/article/${self.id}`);
    }
}
import { TrexComponent, Component, RouterService } from "@framework";
import * as template from './youtube-preview.component.html';
import { inject } from "inversify";

@TrexComponent({
    selector: 'youtube-preview',
    template: template
})
export class YoutubePreviewComponent extends Component {
    public title: string;
    public thumbnail: string;
    public description: string;
    public tags: string[];
    public id: string;

    public constructor(
        @inject(RouterService) private routerService: RouterService) {

        super();
    }

    public gatherInputs(inputs: any): void {
        this.title = inputs.youtube.title;
        this.thumbnail = inputs.youtube.thumbnail;
        this.description = inputs.youtube.description;
        this.tags = inputs.youtube.tags;
        this.id = inputs.youtube.id;
    }

    public goToYoutubeArticle(e: any, self: YoutubePreviewComponent): void {
        self.routerService.goTo(`/article/${self.id}`);
    }
}
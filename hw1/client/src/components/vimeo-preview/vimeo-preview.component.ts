import { TrexComponent, Component, RouterService } from "@framework";
import * as template from './vimeo-preview.component.html';
import { inject } from "inversify";

@TrexComponent({
    selector: 'vimeo-preview',
    template: template
})
export class VimeoPreviewComponent extends Component {
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
        this.title = inputs.vimeo.title;
        this.thumbnail = inputs.vimeo.thumbnail;
        this.description = inputs.vimeo.description;
        this.tags = inputs.vimeo.tags;
        this.id = inputs.vimeo.id;
    }

    public goToVimeoArticle(e: any, self: VimeoPreviewComponent): void {
        self.routerService.goTo(`/article/${self.id}`);
    }
}
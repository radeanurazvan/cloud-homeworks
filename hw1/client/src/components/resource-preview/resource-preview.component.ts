import * as template from './resource-preview.component.html';
import { TrexComponent, RouterService, Component } from "@framework";
import { inject } from 'inversify';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';
import { Resource } from 'src/shared/models/resource.model';

@TrexComponent({
    selector: 'resource-preview',
    template: template
})
export class ResourcePreviewComponent extends Component {
    public resource: Resource;

    public constructor(@inject(RouterService) public routerService: RouterService) {
        super();
    }

    public gatherInputs(inputs: any): void {
        this.resource = inputs.resource;
    }

    public goToArticle(e: any, self: ResourcePreviewComponent): void {
        self.routerService.goTo(`/article/${self.resource.id}`);
    }
}
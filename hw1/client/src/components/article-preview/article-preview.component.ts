import * as template from './article-preview.component.html';
import { TrexComponent, Component, HasInputs, RouterService } from "@framework";
import { Subject } from 'rxjs';
import { inject } from 'inversify';


@TrexComponent({
    selector: 'article-preview',
    template: template
})
export class ArticlePreviewComponent extends Component implements HasInputs{
    public title: string;
    public content: string;
    public tags: string[];
    public id: string;

    public constructor(
        @inject(RouterService) private routerService: RouterService) {
    
        super();
    }

    public gatherInputs(inputs: any): void {
        this.title = inputs.article.title;
        this.content = inputs.article.text;
        this.tags = inputs.article.tags;
        this.id = inputs.article.id;
    }

    public goToArticle(e: any, self: ArticlePreviewComponent): void {
        self.routerService.goTo(`/article/${self.id}`);
    }
}

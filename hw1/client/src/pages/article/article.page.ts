import { TrexPage, DomMaster, Page } from '@framework';

import * as template from './article.page.html'

@TrexPage({
    template: template
})
export class ArticlePage extends Page {

    public constructor(master: DomMaster) {
        super(master);
    }
}
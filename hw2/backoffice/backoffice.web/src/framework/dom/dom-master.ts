import * as rivets from 'rivets';
import { injectable } from 'inversify';

import { Page } from '../markers';
import { DomContainer } from './dom-container';

@injectable()
export class DomMaster {
    private currentView: any;

    public constructor(private readonly container: DomContainer) {
    }

    public bindPage(page: Page): void {
        if (this.currentView) {
            this.currentView.unbind();
        }
        
        this.container.$element.innerHTML = page.__template;
        
        this.container.$element.id = page.tag;
        this.container.$element.parentElement.id = page.tag;

        this.currentView = rivets.bind(this.container.$element, page);
    }
}
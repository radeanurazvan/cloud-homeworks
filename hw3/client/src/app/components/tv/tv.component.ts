import { Component } from '@angular/core';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss']
})
export class TvComponent {
    public isOpen = false;

    public open() {
        this.isOpen = true;
    }

    public close() {
        this.isOpen = false;
    }
}

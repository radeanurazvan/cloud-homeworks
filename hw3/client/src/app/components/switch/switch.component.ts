import { Component } from '@angular/core';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
    public status = false;

    public turnOn(): void {
        this.status = true;
    }

    public turnOff(): void {
        this.status = false;
    }
}

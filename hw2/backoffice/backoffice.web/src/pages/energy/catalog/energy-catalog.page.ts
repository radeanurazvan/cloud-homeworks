import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit } from '@framework';

import * as template from './energy-catalog.page.html'
import { EnergyService } from '../energy.service';

@TrexPage({
    template: template
})
export class EnergyCatalogPage extends Page implements OnInit {
    public providers: any[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(EnergyService) private service:EnergyService) {
        super(master);
    }

    public async onInit() {
        this.providers = await this.service.getCatalog();
    }
}

import { Module } from '@framework';
import { SidebarComponent, FilterBarComponent, NotFoundComponent } from '@components';
import { EnergyDefinitionsPage } from './definitions';
import { EnergyCatalogPage } from './catalog';

@Module({
    pages: [EnergyDefinitionsPage, EnergyCatalogPage],
    components: [
        SidebarComponent,
        FilterBarComponent,
        NotFoundComponent
    ]
})
export class EnergyModule {
}
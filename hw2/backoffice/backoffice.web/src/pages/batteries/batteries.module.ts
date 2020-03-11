import { Module } from '@framework';
import { SidebarComponent, FilterBarComponent, NotFoundComponent } from '@components';
import { BatteriesDefinitionsPage } from './definitions';
import { BatteriesCatalogPage } from './catalog';

@Module({
    pages: [BatteriesDefinitionsPage, BatteriesCatalogPage],
    components: [
        SidebarComponent,
        FilterBarComponent,
        NotFoundComponent
    ]
})
export class BatteriesModule {
}
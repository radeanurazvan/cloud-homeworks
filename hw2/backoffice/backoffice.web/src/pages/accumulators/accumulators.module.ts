import { Module } from '@framework';
import { SidebarComponent, FilterBarComponent, NotFoundComponent } from '@components';
import { AccumulatorsDefinitionsPage } from './definitions';
import { AccumulatorsCatalogPage } from './catalog';

@Module({
    pages: [AccumulatorsDefinitionsPage, AccumulatorsCatalogPage],
    components: [
        SidebarComponent,
        FilterBarComponent,
        NotFoundComponent
    ]
})
export class AccumulatorsModule {
}
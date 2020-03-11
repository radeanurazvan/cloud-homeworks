import { Module } from '@framework';
import { SidebarComponent, FilterBarComponent, NotFoundComponent } from '@components';

@Module({
    pages: [],
    components: [
        SidebarComponent,
        FilterBarComponent,
        NotFoundComponent
    ]
})
export class CustomersModule {
}
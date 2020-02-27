import { Module } from '@framework';
import { SidebarComponent, FilterBarComponent, NotFoundComponent } from '@components';
import { HomePage } from '@pages';
import { ProposalComponent } from './components';
import { ResourcePreviewComponent } from 'src/components/resource-preview/resource-preview.component';

@Module({
    pages: [HomePage],
    components: [
        SidebarComponent,
        FilterBarComponent,
        NotFoundComponent,
        ProposalComponent,
        ResourcePreviewComponent
    ]
})
export class HomeModule {
}
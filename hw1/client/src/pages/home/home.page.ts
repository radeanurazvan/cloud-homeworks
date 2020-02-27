import { inject } from 'inversify';
import { TrexPage, DomMaster, Page, OnInit, NotificationsService, NotificationMessage } from '@framework';

import * as template from './home.page.html'
import { Subject } from 'rxjs';
import { ResourcesService } from 'src/shared/services/resources.service';
import { PageResponse } from 'src/shared/models/page.response';
import { Resource } from 'src/shared/models/resource.model';

@TrexPage({
    template: template
})
export class HomePage extends Page implements OnInit {
    public filterbarChannel: Subject<any> = new Subject<any>();
    public sidebarChannel: Subject<string> = new Subject<string>();
    public proposalChannel: Subject<string> = new Subject<string>();
    public notFound: boolean = false;
    
    public isHistorySelected: boolean = false;
    public isSavedSelected: boolean = false;
    public isProposalsSelected: boolean = false;
    public isDiscoverSelected: boolean = true;

    private localOrderByValue: string = 'asc';
    private localSearchValue: string = '';
    private localFilterByValue: string = '';

    public resourcesPage: PageResponse;
    public updatedArticles: any[];

    public discoveredResources: Resource[] = [];
    public searchedResources: Resource[] = [];

    public constructor(
        @inject(DomMaster) master: DomMaster,
        @inject(ResourcesService) private resourcesService,
        @inject(NotificationsService) private notifications) {
        
        super(master);
        resourcesService.find('.NET', 1, 'title');
    }

    public onInit(): void {
        this.resourcesService.find('', 1, 'title').then((x) => {
            this.resourcesPage = x;
                
            this.updatedArticles = this.resourcesPage.items;
            this.initChannels();
            this.orderArticlePreviews(this.localOrderByValue);
        });
    }

    private initChannels(): void {
        this.filterbarChannel.subscribe((data: any) => {
            if (data.type === 'search') {
                this.localSearchValue = data.value;
                this.filterArticlePreviewsBySearch(this.localSearchValue);
            } else {
                if (data.type === 'orderBy') {
                    this.localOrderByValue = data.value;
                    this.orderArticlePreviews(this.localOrderByValue);
                } else {
                    this.localFilterByValue = data.value;
                    this.filterArticlePreviewsByFilter(this.localFilterByValue);
                }
            }
        });

        this.proposalChannel.subscribe((value: string) => {
            //handle form input - make request
        });

        this.sidebarChannel.subscribe((value: string) => {
            if (value === 'HISTORY') {
                this.isHistorySelected = true;
                this.isSavedSelected = false;
                this.isProposalsSelected = false;
                this.isDiscoverSelected = false;
                this.discoveredResources = [];
            }

            if (value === 'SAVED') {
                this.isHistorySelected = false;
                this.isSavedSelected = true;
                this.isProposalsSelected = false;
                this.isDiscoverSelected = false;
                this.discoveredResources = [];
            }

            if (value === 'PROPOSALS') {
                this.isHistorySelected = false;
                this.isSavedSelected = false;
                this.isProposalsSelected = true;
                this.isDiscoverSelected = false;
                this.discoveredResources = [];
            }

            if (value === 'DISCOVER') {
                this.isHistorySelected = false;
                this.isSavedSelected = false;
                this.isProposalsSelected = false;
                this.isDiscoverSelected = true;
            }
        })
    }

    private filterArticlePreviewsBySearch(searchValue: string) {
        this.updatedArticles = [];
        this.updatedArticles = this.resourcesPage.items.filter(x => {
            return x.title.toLowerCase().includes(searchValue.toLowerCase());
        });

        this.notFound = this.updatedArticles.length === 0 ? true: false;
        this.orderArticlePreviews(this.localOrderByValue);
    }

    private filterArticlePreviewsByFilter(filterByValue: string) {
        this.filterArticlePreviewsBySearch(this.localSearchValue);
        if (filterByValue !== '') {
            const tempUpdatedArticles = this.updatedArticles; 
            this.updatedArticles = [];
            this.updatedArticles = tempUpdatedArticles.filter(x => {
                return x.tags.includes(filterByValue);
            });
        }
    }

    private orderArticlePreviews(orderByValue: string) {
        const tempUpdatedArticles = this.updatedArticles; 
        this.updatedArticles = [];
        this.updatedArticles = tempUpdatedArticles.sort((a, b) => {
            if (orderByValue === 'asc') {
                if(a.title > b.title) {
                return 1;
                } else if(a.title < b.title) {
                return -1;
                } else {
                return 0;
                }
            } else {
                if(a.title < b.title) {
                return 1;
                } else if(a.title > b.title) {
                return -1;
                } else {
                return 0;
                }
            }
        });
    }

    public topic: string = '';

    public searchTopic(e: Event, self: HomePage): void {
        e.preventDefault();
        self.discoveredResources = [];

        self.resourcesService.find(self.topic, 1, 'newest').then((page: any) => {
            self.searchedResources = [];
            self.searchedResources = page;
        });
    }

    public discoverMore(e: Event, self: HomePage): void {
        e.preventDefault();
        self.discoveredResources = [];

        self.resourcesService.discoverTopic(self.topic);
    }
}
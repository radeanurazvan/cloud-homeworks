import { 
    BatteriesDefinitionsPage,
    BatteriesCatalogPage,
    AccumulatorsDefinitionsPage,
    AccumulatorsCatalogPage,
    EnergyDefinitionsPage,
    EnergyCatalogPage,
    CustomersPage,
    OrdersPage,
    CreateOrderPage
} from '@pages';

export interface Route {
    page: any;
    redirectTo: any;
}

export const routes: {[s: string]: Partial<Route>} = {
    '/home': {
        page: BatteriesDefinitionsPage
    },
    '/batteries/definitions': {
        page: BatteriesDefinitionsPage
    },
    '/batteries/catalog': {
        page: BatteriesCatalogPage
    },
    '/accumulators/definitions': {
        page: AccumulatorsDefinitionsPage
    },
    '/accumulators/catalog': {
        page: AccumulatorsCatalogPage
    },
    '/energy/definitions': {
        page: EnergyDefinitionsPage
    },
    '/energy/catalog': {
        page: EnergyCatalogPage
    },
    '/customers': {
        page: CustomersPage
    },
    '/orders': {
        page: OrdersPage
    },
    '/orders/create': {
        page: CreateOrderPage
    },
    '*': {
        redirectTo: '/home'
    },
};
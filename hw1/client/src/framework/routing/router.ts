import Navigo  = require('navigo');

import { trexContainer } from '@ioc';
import { Route } from '@constants';

export class Router {
    private static router: Navigo = null;

    public static init(routes: {[s: string]: Partial<Route>}): void {
        const navigoConfig: any = {};
        for(const key in routes) {
            navigoConfig[key] = (params: {[x: string]: any}, query: any) => {
                console.log(params);
                const config = routes[key];
                if(config.redirectTo) {
                    Router.router.navigate(config.redirectTo);
                    return;
                }

                const pageInstance: any = trexContainer.resolve(config.page);
                pageInstance.render();
            };
        }

        console.log(navigoConfig);
        Router.router = new Navigo(null, false);        
        Router.router.on(navigoConfig)
            .resolve();
    }

    public static navigate(route: string): void {
        Router.router.navigate(route);
    }
}
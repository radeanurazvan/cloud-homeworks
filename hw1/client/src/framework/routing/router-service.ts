import Navigo = require('navigo');
import { injectable } from "inversify";

import { Router } from '@framework';

@injectable()
export class RouterService {
    public goToHome(): void {
        this.goTo('/home');
    }
    
    public goTo(route: string): void {
        Router.navigate(route);
    }   
}
import { LoginModule, HomeModule } from "@pages";
import { Router } from "@framework";
import { routes } from "@constants";

export class AppModule {
    private modules: any = [
        LoginModule,
        HomeModule
    ];    

    public static run(): void {
        Router.init(routes);
    }
}
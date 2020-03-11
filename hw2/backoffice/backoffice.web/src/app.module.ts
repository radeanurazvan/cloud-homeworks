import { Router } from "@framework";
import { routes } from "@constants";
import { 
    LoginModule,
    BatteriesModule,
    AccumulatorsModule,
    EnergyModule,
    OrdersModule
} from "@pages";

export class AppModule {
    private modules: any = [
        LoginModule,
        BatteriesModule,
        AccumulatorsModule,
        EnergyModule,
        OrdersModule
    ];    

    public static run(): void {
        Router.init(routes);
    }
}
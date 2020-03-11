import { PageConstructor, ComponentConstructor } from "@framework";

interface ModuleParams {
    pages: any[];
    components: any[];
}

export function Module(params: ModuleParams): any {
    return (ctor: any) => {
    };
}
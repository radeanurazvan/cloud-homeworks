import { Provider } from "./provider.model";

export class Resource {
    public title: string;
    public description: string;
    public type: string;
    public provider: Provider;
    public id: string;
}
import { injectable } from "inversify";

export interface ComponentConstructor {
    new(): Component
}

export interface HasInputs {
    gatherInputs(inputs: any, self: any): void;
}

@injectable()
export abstract class Component {
}
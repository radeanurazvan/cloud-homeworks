import { Resource } from "./resource.model";

export class PageResponse {
    public items: Resource[] = [];
    public totalCount: number = 0;
}
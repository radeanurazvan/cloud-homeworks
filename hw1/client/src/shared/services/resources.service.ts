import { injectable } from "inversify";
import Axios, {  } from 'axios';
import { Page } from "@framework";
import { PageResponse } from "../models/page.response";

@injectable()
export class ResourcesService {
    private readonly serviceUri = 'http://localhost:3000/api/search'

    public async find(topic: string, page: number, orderBy: string): Promise<any> {
        const queryString = `?q=${topic}`;
        const apiResponse = await Axios.get<any>(`${this.serviceUri}${queryString}`);

        return apiResponse.data.songs;
    }

    public async discoverTopic(topic: string): Promise<void> {
        await Axios.post('http://localhost:51096/api/v1/discoveries', {
            topic: topic
        });
    }
}
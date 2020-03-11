import { injectable } from "inversify";
import Axios, {  } from 'axios';
import { Page } from "@framework";
import { PageResponse } from "../models/page.response";

@injectable()
export class ResourcesService {
    private readonly serviceUri = 'http://localhost:51096/api/v1/resources'

    public async find(topic: string, page: number, orderBy: string): Promise<PageResponse> {
        const queryString = `?topic=${topic}&page=${page}&orderBy=${orderBy}`;
        const apiResponse = await Axios.get<PageResponse>(`${this.serviceUri}${queryString}`);

        return apiResponse.data;
    }

    public async discoverTopic(topic: string): Promise<void> {
        await Axios.post('http://localhost:51096/api/v1/discoveries', {
            topic: topic
        });
    }
}
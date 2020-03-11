import { injectable } from "inversify";
import Axios from 'axios';
import { Subject, Observable } from "rxjs";

@injectable()
export class CustomersService {
    private readonly serviceUri = 'http://localhost:5000/api/customers'
    private readonly changesChannel: Subject<any> = new Subject<any>();

    public async getAll(): Promise<any[]> {
        const apiResponse = await Axios.get<any>(`${this.serviceUri}`);
        return apiResponse.data;
    }

    public async create(data): Promise<any> {
        await Axios.post(`${this.serviceUri}`, data);
        this.changesChannel.next();
    }

    public async toggleLoyalty(id: string): Promise<any> {
        await Axios.patch(`${this.serviceUri}/${id}/loyalty`);
        this.changesChannel.next();
    }

    public async delete(id: string): Promise<any> {
        await Axios.delete(`${this.serviceUri}/${id}`);
        this.changesChannel.next();
    }

    public get onChanges(): Observable<any> {
        return this.changesChannel;
    }
}
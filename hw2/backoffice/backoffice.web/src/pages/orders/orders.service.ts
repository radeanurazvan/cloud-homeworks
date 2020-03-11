import { injectable } from "inversify";
import Axios from 'axios';
import { Subject, Observable } from "rxjs";

@injectable()
export class OrdersService {
    private readonly serviceUri = 'http://localhost:5000/api/orders'
    private readonly changesChannel: Subject<any> = new Subject<any>();

    public async getAll(): Promise<any[]> {
        const apiResponse = await Axios.get<any>(`${this.serviceUri}`);
        return apiResponse.data;
    }

    public async create(data): Promise<any> {
        console.log(data);
        await Axios.post(`${this.serviceUri}`, data);
        this.changesChannel.next();
    }
}
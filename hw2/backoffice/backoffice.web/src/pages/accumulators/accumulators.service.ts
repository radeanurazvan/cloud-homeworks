import { injectable } from "inversify";
import Axios from 'axios';
import { Subject, Observable } from "rxjs";

@injectable()
export class AccumulatorsService {
    private readonly serviceUri = 'http://localhost:5000/api/accumulators'
    private readonly changesChannel: Subject<any> = new Subject<any>();

    public async getDefinitions(): Promise<any[]> {
        const apiResponse = await Axios.get<any>(`${this.serviceUri}/definitions`);
        return apiResponse.data;
    }

    public async getCatalog(): Promise<any[]> {
        const apiResponse = await Axios.get<any>(`${this.serviceUri}/catalog`);
        return apiResponse.data;
    }

    public async promote(id: string, data): Promise<any> {
        await Axios.patch(`${this.serviceUri}/definitions/${id}`, data);
        this.changesChannel.next();
    }

    public async delete(id: string): Promise<any> {
        await Axios.delete(`${this.serviceUri}/definitions/${id}`);
        this.changesChannel.next();
    }

    public async changePrice(id: string, price: number): Promise<any> {
        await Axios.patch(`${this.serviceUri}/catalog/${id}/price`, {price});
        this.changesChannel.next();
    }

    public async changeStock(id: string, stock: number): Promise<any> {
        await Axios.patch(`${this.serviceUri}/catalog/${id}/stock`, {stock});
        this.changesChannel.next();
    }

    public get onChanges(): Observable<any> {
        return this.changesChannel;
    }
}
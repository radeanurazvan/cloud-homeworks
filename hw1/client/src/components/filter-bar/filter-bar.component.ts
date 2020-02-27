import * as template from './filter-bar.component.html';
import { TrexComponent, Component, HasInputs } from "@framework";
import { Subject } from 'rxjs';


@TrexComponent({
    selector: 'filter-bar',
    template: template
})
export class FilterBarComponent extends Component implements HasInputs {
    public inputValue: string = '';
    public orderByValues: any[] = [
        {
            name: 'Title ascending',
            value: 'asc'
        },
        {
            name: 'Title descending',
            value: 'desc'
        },
        {
            name: 'Newest',
            value: 'new'
        }
    ];
    public filterByValues: string[] = ['', 'aaa', 'bbb', 'ccc', 'ddd'];

    private channel: Subject<any>;

    public gatherInputs(inputs: any): void {
        this.channel = inputs.channel;
    }

    public search(e: any, self: FilterBarComponent): void {
        const input = {
            type: 'search',
            value: self.inputValue
        }
        self.channel.next(input);
    }

    public orberByValueSelected(e: any, self: FilterBarComponent): void {
        let orderValue = '';
        self.orderByValues.forEach(x => {
            if (x.name === e.srcElement.value) {
                orderValue = x.value;
            }
        });

        const orderBy = {
            type: 'orderBy',
            value: orderValue
        }
        self.channel.next(orderBy);
    }

    public filterByValueSelected(e: any, self: FilterBarComponent): void {
        let filterValue = '';
        self.filterByValues.forEach(x => {
            if (x === e.srcElement.value) {
                filterValue = x;
            }
        });

        const filterBy = {
            type: 'filterBy',
            value: filterValue
        }
        self.channel.next(filterBy);
    }
}

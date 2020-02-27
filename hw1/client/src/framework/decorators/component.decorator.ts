import * as rivets from 'rivets';
import { trexContainer } from '@ioc';

interface ComponentParams {
    selector: string;
    template: string;
}

function hasInputs(instance: any): boolean {
    return 'gatherInputs' in instance;
}

export function TrexComponent(params: ComponentParams): any {
    return (ctor: any) => {
        const selector = `trex-${params.selector}`;

        ctor.prototype.__selector = selector;
        ctor.prototype.__template = params.template;

        rivets.components[selector] = {
            template: () => params.template,
            initialize: (e, inputs) => {
                const component: any = trexContainer.resolve(ctor);
                if(hasInputs(component)) {
                    component.gatherInputs(inputs);
                }

                return component; 
            }
        }
    }
}
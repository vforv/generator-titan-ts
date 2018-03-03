import {I<%= serviceCC %>DataModel} from '../model/data/<%= serviceName %>-data.model';

export function readLogic(from: number, size: number): { result: I<%= serviceCC %>DataModel[] } {

    return {
        result: [{
            example: `from: ${from} size: ${size}`,
        }],
    };
}

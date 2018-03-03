import {I<%= serviceCC %>DataModel} from '../model/data/<%= serviceName %>-data.model';

export function readOneLogic(modelId: string | number): { result: I<%= serviceCC %>DataModel } {

    return {
        result: {
            example: `param: ${modelId}`,
        },
    };
}

import {I<%= serviceCC %>DataModel} from '../model/data/<%= serviceName %>-data.model';

export function createLogic(model: I<%= serviceCC %>DataModel): { result: I<%= serviceCC %>DataModel } {
    return {
        result: model,
    };
}

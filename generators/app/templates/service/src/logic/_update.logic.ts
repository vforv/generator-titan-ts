import { Container } from 'typedi';
import {I<%= serviceCC %>DataModel} from '../model/data/<%= serviceName %>-data.model';
import { IAbstractDbFactory } from '../model/infrastructure/db';

export function updateLogic(
    id: string,
    model: I<%= serviceCC %>DataModel,
): Promise<{ result: I<%= serviceCC %>DataModel }> {

    const mongo: IAbstractDbFactory<I<%= serviceCC %>DataModel> = Container.get('mongo.concreate.factory');

    const result = mongo.update('example', id, model);

    return result;
}

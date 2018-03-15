import { Container } from 'typedi/Container';
import {I<%= serviceCC %>DataModel} from '../model/data/<%= serviceName %>-data.model';
import { IAbstractDbFactory } from '../model/infrastructure/db';

export function readLogic(from: number, size: number): { result: I<%= serviceCC %>DataModel[] } {

    const mongo: IAbstractDbFactory<I<%= serviceCC %>DataModel> = Container.get('mongo.concreate.factory');

    const result = mongo.find('example', {});

    return result;
}

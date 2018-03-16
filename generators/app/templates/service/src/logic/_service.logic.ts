import {I<%= serviceCC %>DataModel} from '../model/data/<%= serviceName %>-data.model';

/**
 * Example how to add query to db. result const returns Promise with result Promise<{ result: I<%= serviceCC %>DataModel }>
 * If you are not using database remove connection from service.ts file
 *
 * const mongo: IAbstractDbFactory<I<%= serviceCC %>DataModel> = Container.get('mongo.concreate.factory');
 * const result = mongo.find('example', id);
 */
export function serviceLogic(id: string): Promise<{ result: I<%= serviceCC %>DataModel }> {
    const result: any = {
        result: {
            example: `ID: ${id}`,
        },
    };

    return Promise.resolve(result);
}

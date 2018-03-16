import { Service } from 'typedi';
import { ICRUD } from '../model/infrastructure/crud';
import {I<%= serviceCC %>DataModel} from '../model/data/<%= serviceName %>-data.model';
import { createLogic } from './create.logic';
import { updateLogic } from './update.logic';
import { deleteLogic } from './delete.logic';
import { readLogic } from './read.logic';
import { readOneLogic } from './read-one.logic';

@Service('<%= serviceName %>.logic')
export class <%= serviceCC %>Logic implements ICRUD<I<%= serviceCC %>DataModel> {

    public create(model: I<%= serviceCC %>DataModel): Promise<{ result: I<%= serviceCC %>DataModel }> {

        return createLogic(model);
    }

    public read(size: number, prev?: string, next?: string): Promise<{ result: I<%= serviceCC %>DataModel[] }> {

        return readLogic(size, prev, next);
    }

    public readOne(id: string): Promise<{ result: I<%= serviceCC %>DataModel }> {

        return readOneLogic(id);
    }

    public update(
        id: string,
        model: I<%= serviceCC %>DataModel,
    ): Promise<{ result: I<%= serviceCC %>DataModel }> {

        return updateLogic(id, model);
    }

    public delete(modelId: string): Promise<{ result: I<%= serviceCC %>DataModel }> {

        return deleteLogic(modelId);
    }
}

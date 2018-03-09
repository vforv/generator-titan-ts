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

    public create(model: I<%= serviceCC %>DataModel): { result: I<%= serviceCC %>DataModel } {

        return createLogic(model);
    }

    public read(from: number, size: number): { result: I<%= serviceCC %>DataModel[] } {

        return readLogic(from, size);
    }

    public update(model: I<%= serviceCC %>DataModel): { result: I<%= serviceCC %>DataModel } {

        return updateLogic(model);
    }

    public delete(modelId: string | number): { result: I<%= serviceCC %>DataModel } {

        return deleteLogic(modelId);
    }
}

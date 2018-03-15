import { Service } from 'typedi';
import { serviceLogic } from './service.logic';
import { I<%= serviceCC %>DataModel } from '../model/data/<%= serviceName %>-data.model';
import { I<%= serviceCC %>Repository } from '../model/infrastructure/service';

@Service('<%= serviceName %>.logic')
export class <%= serviceCC %>Logic implements I<%= serviceCC %>Repository {

    public serviceMethod(id: string): Promise<{ result: I<%= serviceCC %>DataModel }> {

        return serviceLogic(id);
    }
}

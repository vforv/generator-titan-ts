import { I<%= serviceCC %>DataModel } from '../data/<%= serviceName %>-data.model';

export interface I<%= serviceCC %>Repository {
    serviceMethod(id: string): Promise<{ result: I<%= serviceCC %>DataModel }>;
}

import { MongoClient, Db, ObjectID } from 'mongodb';
import { Service } from 'typedi';
import { IModel } from '../../model/infrastructure/db';

@Service('mongo.factory')
export class MongoFactory<T> implements IModel<T> {

    public state: Db;
    public connection: any;

    public connect(url: string, dbName: string): Promise<MongoClient> {

        return MongoClient.connect(url)
            .then((response: any) => {
                this.state = response.db(dbName);
                this.connection = response;
                return response;
            })
            .catch(/* istanbul ignore next */(e: any) => {
                throw new Error(e);
            });

    }

    public getInstance(): Db {
        return this.state;
    }

    public create(collection: string, model: object): Promise<{ result: T }> {
        const cursor: any = this.state.collection(collection).insertOne(model);

        return cursor
            .then((results: any) => {

                const entity = {
                    ...model,
                    id: results.insertedId,
                };

                return {
                    result: entity,
                };
            })
            .catch(/* istanbul ignore next */(err: any) => {
                throw new Error(err);
            });
    }

    public update(collection: string, id: string, model: object): Promise<{ result: T }> {
        const cursor: any = this.state.collection(collection).findOneAndReplace({ _id: new ObjectID(id) }, model);

        return cursor
            .then((result: any) => {

                const entity = {
                    ...model,
                    id,
                };

                return {
                    result: entity,
                };
            })
            .catch(/* istanbul ignore next */(err: any) => {
                throw new Error(err);
            });
    }

    public find(collection: string, query: any): Promise<{ result: T[] }> {
        const cursor: any = this.state.collection(collection).find(query).toArray();

        return cursor
            .then((results: T[]) => {
                return {
                    result: results,
                };
            })
            .catch(/* istanbul ignore next */(err: any) => {
                throw new Error(err);
            });
    }

    public findOne(collection: string, id: string): Promise<{ result: T }> {
        const cursor: any = this.state.collection(collection).findOne({ _id: new ObjectID(id) });

        return cursor
            .then((result: any) => {
                const entity = {
                    ...result,
                    id,
                };

                return {
                    result: entity,
                };
            })
            .catch(/* istanbul ignore next */(err: any) => {
                throw new Error(err);
            });
    }

    public delete(collection: string, id: string): Promise<{ result: T }> {
        const cursor: any = this.state.collection(collection).deleteOne({ _id: new ObjectID(id) });

        return cursor
            .then((result: { result: T }) => {

                return {
                    result: {
                        id,
                    },
                };
            })
            .catch(/* istanbul ignore next */(err: any) => {
                throw new Error(err);
            });
    }
}

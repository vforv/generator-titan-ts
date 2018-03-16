import { MongoClient, Db, ObjectID } from 'mongodb';
import { Service } from 'typedi';
import { IModel } from '../../model/infrastructure/db';
import * as MongoPaging from 'mongo-cursor-pagination';

@Service('mongo.factory')
export class MongoFactory<T> implements IModel<T> {

    public state: any;
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

    public find(collection: string, query: any, limit: number, prev?: string, next?: string): Promise<{ result: T[] }> {

        const cursor: any = this.state.collection(collection);

        const pagQ: any = {
            query,
            limit,
        };

        const prevNext = this.nextOrPrev(pagQ, prev, next);

        return MongoPaging.find(cursor, prevNext)
            .then((data: { results: any, previous: string, next: string, hasPrevious: boolean, hasNext: boolean }) => {
                const result = data.results.map((item: any) => {

                    const newItem = {
                        ...item,
                        id: item._id,
                    };

                    return newItem;
                });

                return {
                    result,
                    previous: data.previous,
                    next: data.next,
                    hasPrevious: data.hasPrevious,
                    hasNext: data.hasNext,
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

    private nextOrPrev(pagQ: any, prev?: string, next?: string) {
        if (prev && !next) {
            pagQ.previous = prev;
        } else if (next && !prev) {
            pagQ.next = next;
        }

        return pagQ;
    }
}

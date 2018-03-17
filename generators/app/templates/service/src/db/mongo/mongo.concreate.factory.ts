import { Service, Inject } from 'typedi';
import { MongoClient } from 'mongodb';
import { IModel, IAbstractDbFactory } from '../../model/infrastructure/db';
import * as replaceOnce from 'replace-once';
import { DB_NAME } from '../db-name';

@Service('mongo.concreate.factory')
export class MongoConcreateFacotry<T> implements IAbstractDbFactory<T> {

    constructor( @Inject('mongo.factory') public mongo: IModel<any>) { }

    public connection(unsetHost: string, username: string, password: string): Promise<MongoClient> {
        const str: any = unsetHost;
        const dbName: any = DB_NAME;
        const find = ['PASSWORD', 'USERNAME', 'DATABASE'];
        const replace = [password, username, dbName];

        const host = replaceOnce(str, find, replace, 'gi');

        return this.mongo.connect(host, dbName);
    }

    public find(
        collection: string,
        query: any,
        size: number,
        prev?: string,
        next?: string,
    ): Promise<{ result: any[]; }> {
        return this.mongo.find(collection, query, size, prev, next);
    }

    public create(collection: string, model: object): Promise<{ result: any; }> {
        return this.mongo.create(collection, model);
    }

    public update(collection: string, id: string, model: object): Promise<{ result: any; }> {
        return this.mongo.update(collection, id, model);
    }

    public findOne(collection: string, id: string): Promise<{ result: any; }> {
        return this.mongo.findOne(collection, id);
    }

    public delete(collection: string, id: string): Promise<{ result: any; }> {
        return this.mongo.delete(collection, id);
    }

    public getInstance() {
        return this.mongo.getInstance();
    }
} /* istanbul ignore next */

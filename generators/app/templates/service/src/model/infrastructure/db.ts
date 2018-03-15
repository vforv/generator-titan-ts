import { MongoClient, Db } from 'mongodb';

export interface IModel<T> {
    connect(url: string, dbName: string): Promise<MongoClient>;
    getInstance(): Db;
    find(collection: string, query: any): Promise<{ result: T[] }>;
    create(collection: string, model: object): Promise<{ result: T }>;
    update(collection: string, id: string, model: object): Promise<{ result: T }>;
    findOne(collection: string, id: string): Promise<{ result: T }>;
    delete(collection: string, id: string): Promise<{ result: T }>;
}

export interface IAbstractDbFactory<T> {
    connection(): Promise<MongoClient>;
    find(collection: string, query: any): Promise<{ result: T[] }>;
    create(collection: string, model: object): Promise<{ result: T }>;
    update(collection: string, id: string, model: object): Promise<{ result: T }>;
    findOne(collection: string, id: string): Promise<{ result: T }>;
    delete(collection: string, id: string): Promise<{ result: T }>;
    getInstance(): any;
}

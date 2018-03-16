export interface ICRUD<T> {
    create(model: T): Promise<{ result: T }>;
    read(size: number, prev?: string, next?: string): Promise<{ result: T[] }>;
    update(modelId: string, model: T): Promise<{ result: T }>;
    delete(modelId: string): Promise<{ result: T }>;
    readOne(modelId: string): Promise<{ result: T }>;
}

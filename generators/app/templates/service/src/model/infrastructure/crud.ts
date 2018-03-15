export interface ICRUD<T> {
    create(model: T): Promise<{ result: T }>;
    read(from: number, size: number): Promise<{ result: T[] }>;
    update(modelId: string, model: T): Promise<{ result: T }>;
    delete(modelId: string | number): Promise<{ result: T }>;
    readOne(modelId: string | number): Promise<{ result: T }>;
}

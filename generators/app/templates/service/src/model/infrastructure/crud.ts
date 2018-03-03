
export interface ICRUD<T> {
    create(model: T): { result: T };
    read(from: number, size: number): { result: T[] };
    update(model: T): { result: T };
    delete(modelId: string | number): { result: T };
    readOne?(modelId: string | number): { result: T };
}

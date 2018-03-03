import { Container } from 'typedi';
import { RouterRoute } from './routes';

export function Router() {
    return (object: object, propertyName: string, index?: number) => {
        const router = new RouterRoute();
        Container.registerHandler({ object, propertyName, index, value: (containerInstance: any) => router });
    };
}

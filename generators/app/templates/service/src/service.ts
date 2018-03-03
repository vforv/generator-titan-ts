import 'reflect-metadata';

export * from './provider';

import { Container } from 'typedi';

const server: any = Container.get('server');
server.startServer();

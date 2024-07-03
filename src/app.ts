import express, { Express } from 'express';
import { GateWayServer } from '@gateway/server';

class Application {
  public initialize(): void {
    const app: Express = express();
    const server: GateWayServer = new GateWayServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
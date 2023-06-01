import express, { Express } from 'express';
import { PMSGoServer } from './server';
import databaseConnection from './config/database.config';
import { envConfig } from './config/env.config';

class Application {
  public initialize(): void {
    this.loadEnvConfig();
    databaseConnection();
    const app: Express = express();
    const server: PMSGoServer = new PMSGoServer(app);
    server.start();
  }
  private loadEnvConfig(): void {
    envConfig.validateEnvConfig();
  }
}
const application: Application = new Application();
application.initialize();

import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import compression from 'compression';
import bodyParser from 'body-parser';
import HTTP_STATUS from 'http-status-codes';
import 'express-async-errors';
import mongoSanitize from 'express-mongo-sanitize';
import Logger from 'bunyan';
import rateLimit from 'express-rate-limit';
import { envConfig } from './config/env.config';
import appRoutes from './routes';
import { logConfig } from './config/log.config';
import { CustomError, IErrorResponse } from './utility/error.handler.utility';

const log: Logger = logConfig.createLogger('server');

export class PMSGoServer {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: ['test1', 'test2'],
        maxAge: 24 * 7 * 3600000,
        secure: false
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(app: Application): void {
    app.use(bodyParser.json());
    app.use(compression());
    app.use(mongoSanitize());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
  }

  private routeMiddleware(app: Application): void {
    appRoutes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  private startServer(app: Application): void {
    app.listen(envConfig.APP_PORT, () => {
      log.info(`Application Start On Port ${envConfig.APP_PORT}`);
    });
  }
}

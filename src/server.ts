import http from 'http';

import { Logger } from 'winston';
import { CustomError, IErrorResponse, winstonLogger } from '@quysterben/jobber-shared';
import { Application, Request, urlencoded, Response, NextFunction } from 'express';
import cookieSession from 'cookie-session';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';
import { config } from '@gateway/config';
import { elasticSearch } from '@gateway/elasticsearch';
import { appRoutes } from '@gateway/routes';
import { axiosAuthInstance } from '@gateway/services/api/auth.service';

const SERVER_PORT = 4000;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'apiGatewayService', 'debug');

export class GateWayServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.startElasticSearch();
    this.errorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development'
        // sameSite: 'none' // set to none if your using https
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
      })
    );

    app.use((req: Request, _res: Response, next: NextFunction) => {
      if (req.session?.jwt) {
        axiosAuthInstance.defaults.headers.common['Authorization'] = `Bearer ${req.session.jwt}`;
      }
      next();
    });
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));
  }

  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }

  private startElasticSearch(): void {
    elasticSearch.checkConnection();
  }

  private errorHandler(app: Application): void {
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      log.log('error', `Route not found: ${fullUrl}`, '');
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'Route not found'
      });
      next();
    });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        log.log('error', `GatewayService ${error.commingFrom}:`, error);
        res.status(error.statusCode).json(error.serializedError());
      }
      next();
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.log('error', 'GatewayService startServer():', error);
    }
  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {
      log.info(`Worker with process id ${process.pid} on GatewayService started`);
      httpServer.listen(SERVER_PORT, () => {
        log.info(`GatewayService listening on port ${SERVER_PORT}`);
      });
    } catch (error) {
      log.log('error', 'GatewayService startHttpServer():', error);
    }
  }
}

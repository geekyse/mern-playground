import express, { Application, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { allRoutes } from './modules/system/routes';
import cookieParser from 'cookie-parser';
import { HttpError } from './errors';
import { StatusCodes } from 'http-status-codes';
import { AuthenticateAdmin } from './util/request';
import compression from 'compression';
import bodyParser, { json } from 'body-parser';
import { sendHttpErrorModule } from './errors/send-http-error';
import { setupCronJobs } from './server/corn-jobs';
import { dbConnection } from './server/db';

export async function app() {
  // initialize configuration
  dotenv.config();
  await dbConnection();
  await setupCronJobs();
  const app = await createApp();
  initErrorHandler(app);
}

const initErrorHandler = (app: Application) => {
  app.use((error: Error, req: any, res: any, next: NextFunction): void => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
    if (error instanceof HttpError) {
      res.sendHttpError(error, error.message);
    } else {
      error = new HttpError(StatusCodes.INTERNAL_SERVER_ERROR);
      res.sendHttpError(error, error.message);
    }
  });
};

export const createApp = async () => {
  const app = express();
  app.use(cookieParser());
  // https://github.com/expressjs/morgan#readme
  app.use(morgan('combined'));
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  // https://github.com/expressjs/cors#readme
  app.use(cors());
  // https://github.com/expressjs/compression#readme
  app.use(compression());
  // https://github.com/expressjs/body-parser#readme
  app.use(bodyParser.json({limit: '50mb'}));
  app.disable('x-powered-by');
  app.use(sendHttpErrorModule);
  app.use(AuthenticateAdmin);
  app.use('/', allRoutes);
  app.get('/', (req, res) => res.send('App works fine'));
  app.listen('8080', () => console.log(`App listening at http://localhost:8080`));
  return app;
};

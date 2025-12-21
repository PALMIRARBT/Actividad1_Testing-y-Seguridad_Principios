import HttpStatus from 'http-status-codes';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import HttpError from '../error';
import { sendHttpErrorModule } from '../error/sendHttpError';
import Logger from '../../utils/Logger';


/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {
  // express middleware
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser());
  // returns the compression middleware
  app.use(compression());
  // helps you secure your Express apps by setting various HTTP headers
  app.use(helmet());
  // providing a Connect/Express middleware that can be used to enable CORS with various options
  app.use(
    cors({
      exposedHeaders: ['Authorization'],
      optionsSuccessStatus: HttpStatus.OK
    })
  );

  // custom errors
  app.use(sendHttpErrorModule);
}

interface CustomResponse extends express.Response {
  sendHttpError: (error: HttpError | Error, message?: string) => void;
}

/**
 * @export
 * @param {express.Application} app
 */
export function initErrorHandler(app: express.Application): void {
  app.use((error: Error, req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    if (typeof error === 'number') {
      error = new HttpError(error); // next(404)
    }

    if (error instanceof HttpError) {
      if (typeof res.sendHttpError === 'function') {
        res.sendHttpError(error);
      } else {
        const status = (error && typeof (error as any).status === 'number') ? (error as any).status : 500;
        const name = (error && (error as any).name) ? (error as any).name : 'Error';
        const message = (error && (error as any).message) ? (error as any).message : 'Internal Server Error';
        res.status(status).json({
          status,
          name,
          message
        });
      }
    } else {
      if (app.get('env') === 'development') {
        error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
        if (typeof res.sendHttpError === 'function') {
          res.sendHttpError(error);
        } else {
          const status = (error && typeof (error as any).status === 'number') ? (error as any).status : 500;
          const name = (error && (error as any).name) ? (error as any).name : 'Error';
          const message = (error && (error as any).message) ? (error as any).message : 'Internal Server Error';
          res.status(status).json({
            status,
            name,
            message
          });
        }
      } else {
        error = new HttpError(HttpStatus.INTERNAL_SERVER_ERROR);
        if (typeof res.sendHttpError === 'function') {
          res.sendHttpError(error, error.message);
        } else {
          const status = (error && typeof (error as any).status === 'number') ? (error as any).status : 500;
          const name = (error && (error as any).name) ? (error as any).name : 'Error';
          const message = (error && (error as any).message) ? (error as any).message : 'Internal Server Error';
          res.status(status).json({
            status,
            name,
            message
          });
        }
      }
    }

    Logger.error(error);
  });
}

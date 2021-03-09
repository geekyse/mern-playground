import { NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from './index';

export function sendHttpErrorModule(req: Request, res: any, next: NextFunction): void {
  res.sendHttpError = (error: HttpError): void => {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({
      status: error.status,
      name: error.name,
      message: error.message,
      errors: error.errors,
    });
  };
  return next();
}

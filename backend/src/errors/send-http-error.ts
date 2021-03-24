import { NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

// @todo check this code and revamp
export function sendHttpErrorModule(req: Request, res: any, next: NextFunction): void {
  res.sendHttpError = (error: Error, message: string): void => {
    res.status(error.message || StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({
      name: error.name,
      message: error.message,
      errors: error.message,
    });
  };
  return next();
}

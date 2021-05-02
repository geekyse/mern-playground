import { NextFunction, RequestHandler } from 'express-serve-static-core';

export function catchAsyncErrors(fn: RequestHandler): RequestHandler {
  return (req, res, next: NextFunction): void => {
    // @ts-ignore
    const routePromise: Promise<any> = fn(req, res, next);

    if (routePromise.catch) {
      routePromise.catch(err => next('Catch Async Error: ' + err.message));
    }
  };
}

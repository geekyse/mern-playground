import {NextFunction, RequestHandler} from 'express-serve-static-core';


// Catch error that are throw inside route
export function catchAsyncErrors(fn: RequestHandler): RequestHandler {
  return (req, res, next: NextFunction): void => {
    // @ts-ignore
    const routePromise: Promise<any> = fn(req, res, next);

    if (routePromise.catch) {
      routePromise.catch((err: Error): void => {
        console.log("+++++++++ catchAsyncErrors ++++++++++++");
        console.log(err);
        console.log("+++++++++ catchAsyncErrors ++++++++++++");
        next(err);
      });
    }
  };
}

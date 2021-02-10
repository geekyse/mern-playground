import {Response} from 'express-serve-static-core';
import {HttpError} from '../errors';

export interface IBaseAppResponse extends Response {}

// error middleware formatter
export interface IBaseAppResponse {
  sendHttpError: (error: HttpError | Error, message?: string) => void;
}

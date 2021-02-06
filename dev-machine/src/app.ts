import express, {Application, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import {HttpError} from './errors';
import {StatusCodes} from 'http-status-codes';
import cookieParser from 'cookie-parser';
import {sendHttpErrorModule} from './errors/send-http-error';
import {createDbConnection} from "./server/db";

async function app() {
    // initialize configuration
    dotenv.config();
    await createDbConnection();
    const app = await createApp();
    initErrorHandler(app);
}

const initErrorHandler = (app: Application) => {
    app.use((error: Error, req: any, res: any, next: NextFunction): void => {
        if (error instanceof HttpError) {
            res.sendHttpError(error);
        } else {
            console.log(error);
            error = new HttpError(StatusCodes.INTERNAL_SERVER_ERROR);
            res.sendHttpError(error);
        }
    });
};

const createApp = async () => {

    const app = express();
    app.use(cookieParser());

// support json
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

// logs http requests
    app.use(morgan('combined'));
    app.use(cors());
    app.use(sendHttpErrorModule);

    app.get('/', function (req: Request, res: Response) {
        res.send('App works fine :)');
    });

    app.listen(process.env.APP_PORT, () => {
        console.log(`App listening at http://localhost:${process.env.APP_PORT}`);
    });

    return app;
};

export {app, createApp};


import createError from "http-errors";
import express, {Application, NextFunction, Request, Response} from "express";
import morgan from "morgan";
import cors from "cors";
import {allRoutes} from "./modules/routes";
import {dbConnection} from "./server/db";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import {HttpError} from "./errors";
import {StatusCodes} from "http-status-codes";

async function app() {
    // initialize configuration
    dotenv.config();
    await dbConnection;
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
    const app = express()
    app.use(cookieParser());

// support json
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

// logs http requests
    app.use(morgan('combined'));
    app.use(cors());

    app.use('/', allRoutes);
    app.get('/', (req: Request, res: Response) => res.send('App works fine'))

// catch 404 and forward to error handler
    app.use((req: Request, res: Response, next: NextFunction) => next(createError(404)));

// error handler
    app.use((err, req: Request, res: Response, next: NextFunction) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.json(err);
    });

    app.listen("8080", () => console.log(`App listening at http://localhost:8080`))
    return app;
}

export {createApp, app}

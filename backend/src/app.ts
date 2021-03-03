import createError from "http-errors";
import express, {Application, NextFunction} from "express";
import morgan from "morgan";
import cors from "cors";
import {allRoutes} from "./modules/system/routes";
import cookieParser from "cookie-parser";
import {HttpError} from "./errors";
import {StatusCodes} from "http-status-codes";
import {dbConnection} from "./server/db";
import { AuthenticateAdmin} from "./util/request";
import compression from 'compression';
import bodyParser from 'body-parser';
import { sendHttpErrorModule } from './errors/send-http-error';


async function app() {
    // initialize configuration
    await dbConnection();
    const app = await createApp();
    initErrorHandler(app);
}

const initErrorHandler = (app: Application) => {
    app.use((error: Error, req: any, res: any, next: NextFunction): void => {

        if (typeof error === 'number') {
            error = new HttpError(error); // next(404)
        }

        if (error instanceof HttpError) {
            res.sendHttpError(error);
        } else {

            console.log(error);

            error = new HttpError(StatusCodes.INTERNAL_SERVER_ERROR);
            res.sendHttpError(error, error.message);
        }
    });
};

const createApp = async () => {
    const app = express()
    app.use(cookieParser());
    app.use(morgan('combined'));
    app.use(cors());

// returns the compression middleware
    app.use(compression());
    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded());
    // app.use(bodyParser.urlencoded({extended: true}));
    app.disable('x-powered-by');
    app.use(sendHttpErrorModule);

    app.use(AuthenticateAdmin);

    app.use('/', allRoutes);
    app.get('/', (req, res) => res.send('App works fine'))

    // catch 404 and forward to error handler (Middleware)

    app.listen("8080", () => console.log(`App listening at http://localhost:8080`))
    return app;
}

export {createApp, app}

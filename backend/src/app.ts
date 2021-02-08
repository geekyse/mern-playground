import createError from "http-errors";
import express, {Application, NextFunction} from "express";
import morgan from "morgan";
import cors from "cors";
import {allRoutes} from "./modules/routes";
import cookieParser from "cookie-parser";
import {HttpError} from "./errors";
import {StatusCodes} from "http-status-codes";
import {dbConnection} from "./server/db";
import {Authenticate} from "./util/request";


async function app() {
    // initialize configuration
    await dbConnection();
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

    // support json middleware
    app.use(express.json());

    // parse body data
    app.use(express.urlencoded({extended: false}));

    // logs http requests
    app.use(morgan('combined'));
    app.use(cors());

    app.use(Authenticate);

    app.use('/', allRoutes);
    app.get('/', (req, res) => res.send('App works fine'))

    // catch 404 and forward to error handler (Middleware)
    app.use((req, res, next) => {
        console.log("invalid url : ... :(")
        next(createError(404))
    });

    // error handler
    app.use((err, req, res, next: NextFunction) => {
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

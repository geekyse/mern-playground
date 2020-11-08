import express, {Application, NextFunction} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import {allRoutes} from "./routes";
import compression from "compression";
import {Authenticate, AuthenticateAdmin} from "./util/request";
import {sendHttpErrorModule} from "./error/send-http-error";
import {HttpError} from "./errors";
import {StatusCodes} from "http-status-codes";

import slug from "mongoose-slug-updater";


async function bootstrap() {
// initialize configuration
    dotenv.config();
    await setupDbConnection();
    await setupElasticSearchConnection();
    const app = await createApp();

    initErrorHandler(app);
}

const setupElasticSearchConnection = async () => {

}
const setupDbConnection = async () => {

    mongoose.plugin(slug);
    mongoose.set('debug', true)

    const dbConnection = process.env.DB_CONNECTION;

    await mongoose.connect(dbConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        connectTimeoutMS: 100
    });
    mongoose.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            converted.id = converted._id;
            // delete converted._id;
        },
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('we\'re connected!');
    });

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
}


const createApp = async () => {
// Create a new express app instance
    const app: express.Application = express();
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

// Configure Express to use EJS
//     app.set("views", path.join(__dirname, "views"));
//     app.set("view engine", "ejs");

    app.use(Authenticate);
    app.use(AuthenticateAdmin);
    // app.use(fileUpload({
    //     limits: { fileSize: 100 * 1024 * 1024 },
    // }));

    app.get('/', (req, res) => res.send('app is running'));
    app.use('/', allRoutes);
    app.use(express.static('public'))
    const port = process.env.SERVER_PORT;

    app.listen(port, () => {
        console.log(`App is listening on http://localhost:${port}`);
    });
    return app;
}

export {bootstrap, setupDbConnection, createApp};
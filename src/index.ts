import createError from "http-errors";
import express, { Request, Response } from "express";
import morgan from"morgan";
import cors from"cors";
import {routes} from "./modules/user/user-routes";

const {dbConnection} = require("./server/db");


dbConnection();

const app = express()

const router = express.Router();


// support json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logs http requests
app.use(morgan('combined'));
app.use(cors());

app.get('/', function (req:Request, res:Response) {
    res.send('App works fine :)')
})

app.use('/',router);
app.use('/user',routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

app.listen("8080", () => {
    console.log(`App listening at http://localhost:8080`)
})

export {app}

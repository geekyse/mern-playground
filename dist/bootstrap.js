"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = exports.setupDbConnection = exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const compression_1 = __importDefault(require("compression"));
const request_1 = require("./util/request");
const send_http_error_1 = require("./error/send-http-error");
const errors_1 = require("./errors");
const http_status_codes_1 = require("http-status-codes");
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // initialize configuration
        dotenv_1.default.config();
        yield setupDbConnection();
        yield setupElasticSearchConnection();
        const app = yield createApp();
        initErrorHandler(app);
    });
}
exports.bootstrap = bootstrap;
const setupElasticSearchConnection = () => __awaiter(void 0, void 0, void 0, function* () {
});
const setupDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.plugin(mongoose_slug_updater_1.default);
    mongoose_1.default.set('debug', true);
    const dbConnection = process.env.DB_CONNECTION;
    yield mongoose_1.default.connect(dbConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        connectTimeoutMS: 100
    });
    mongoose_1.default.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            converted.id = converted._id;
            // delete converted._id;
        },
    });
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('we\'re connected!');
    });
});
exports.setupDbConnection = setupDbConnection;
const initErrorHandler = (app) => {
    app.use((error, req, res, next) => {
        if (typeof error === 'number') {
            error = new errors_1.HttpError(error); // next(404)
        }
        if (error instanceof errors_1.HttpError) {
            res.sendHttpError(error);
        }
        else {
            console.log(error);
            error = new errors_1.HttpError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            res.sendHttpError(error, error.message);
        }
    });
};
const createApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new express app instance
    const app = express_1.default();
    app.use(cookie_parser_1.default());
    app.use(morgan_1.default('combined'));
    app.use(cors_1.default());
    // returns the compression middleware
    app.use(compression_1.default());
    app.use(body_parser_1.default.json());
    // app.use(bodyParser.urlencoded());
    // app.use(bodyParser.urlencoded({extended: true}));
    app.disable('x-powered-by');
    app.use(send_http_error_1.sendHttpErrorModule);
    // Configure Express to use EJS
    //     app.set("views", path.join(__dirname, "views"));
    //     app.set("view engine", "ejs");
    app.use(request_1.Authenticate);
    app.use(request_1.AuthenticateAdmin);
    // app.use(fileUpload({
    //     limits: { fileSize: 100 * 1024 * 1024 },
    // }));
    app.get('/', (req, res) => res.send('app is running'));
    app.use('/', routes_1.allRoutes);
    app.use(express_1.default.static('public'));
    const port = process.env.SERVER_PORT;
    app.listen(port, () => {
        console.log(`App is listening on http://localhost:${port}`);
    });
    return app;
});
exports.createApp = createApp;

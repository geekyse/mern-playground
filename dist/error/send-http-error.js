"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHttpErrorModule = void 0;
const http_status_codes_1 = require("http-status-codes");
function sendHttpErrorModule(req, res, next) {
    res.sendHttpError = (error) => {
        res.status(error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        res.json({
            status: error.status,
            name: error.name,
            message: error.message,
            errors: error.errors
        });
    };
    return next();
}
exports.sendHttpErrorModule = sendHttpErrorModule;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
const http_1 = __importDefault(require("http"));
class HttpError extends Error {
    /**
     * Creates an instance of HttpError.
     * @param {number} status
     * @param {string} message
     * @param {array} errors
     * @memberOf HttpError
     */
    constructor(status, message, errors) {
        super(message);
        this.name = "HttpError";
        Error.captureStackTrace(this, this.constructor);
        this.errors = errors || [];
        this.status = status || 500;
        this.message = message || http_1.default.STATUS_CODES[this.status] || 'Error';
        // this.name = name || '';
    }
}
exports.HttpError = HttpError;

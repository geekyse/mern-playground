"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = exports.echo = void 0;
exports.echo = (message) => {
    return console.log(message);
};
exports.isProduction = () => {
    return process.env.NODE_ENV == 'production';
};

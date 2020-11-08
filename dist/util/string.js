"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswrds = exports.hashPassword = exports.Summarize = exports.Slug = exports.generateRandomSlugString = exports.generateRandomString = void 0;
const slugify_1 = __importDefault(require("slugify"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
exports.generateRandomString = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateRandomSlugString = () => {
    return exports.generateRandomString(5);
};
exports.Slug = (string) => {
    string = string.replace(/[^a-zA-Z ]/g, ' ');
    string = string.substring(0, 50);
    return slugify_1.default(string, {
        lower: true,
        strict: false,
    });
};
exports.Summarize = (str, length) => {
    if (str.length < length) {
        return str;
    }
    return str.substring(0, length) + '...';
};
exports.hashPassword = (password) => {
    const hash = bcrypt_1.default.hashSync(password, saltRounds);
    return hash;
};
exports.comparePasswrds = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};

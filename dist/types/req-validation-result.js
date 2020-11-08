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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqValidationResult = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../errors");
function reqValidationResult(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (errors.isEmpty()) {
            next();
            return;
        }
        const errArr = errors.array();
        const msgArr = errArr.map((validationError) => `${validationError.param} ${validationError.msg.toLowerCase()}`);
        next(new errors_1.HttpError(400, [...new Set(msgArr)].join('\n'), errArr));
        return;
    });
}
exports.reqValidationResult = reqValidationResult;

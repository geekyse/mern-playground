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
exports.create = exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const types_1 = require("../../types");
const request_1 = require("../../util/request");
const string_1 = require("../../util/string");
const Customer_1 = require("../../models/Customer");
exports.createValidator = [
    express_validator_1.body('firstName')
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 25 })
        .trim()
        .escape(),
    express_validator_1.body('lastName')
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 25 })
        .trim()
        .escape(),
    express_validator_1.body('email')
        .notEmpty()
        .isEmail()
        .normalizeEmail(),
    express_validator_1.body('password')
        .notEmpty()
        .isString(),
    types_1.reqValidationResult
];
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const hashedPassword = string_1.hashPassword(body.password);
        const userRow = new Customer_1.Customer();
        userRow.firstName = body.firstName;
        userRow.lastName = body.lastName;
        userRow.email = body.email;
        userRow.password = hashedPassword;
        userRow.isActive = true;
        // check if email exist
        const userExist = yield Customer_1.Customer.count({ email: userRow.email });
        if (userExist > 0) {
            res.status(400).json(request_1.ValidationError('email', 'This is email already registered'));
            return;
        }
        try {
            yield userRow.save();
            res.json(userRow);
        }
        catch (e) {
            res.status(500).json(request_1.ServerError(e.message));
        }
    });
}
exports.create = create;

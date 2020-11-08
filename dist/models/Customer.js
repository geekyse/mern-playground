"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CustomerSchema = exports.Customer = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const string_1 = require("../util/string");
const CustomerSession_1 = require("./CustomerSession");
const CustomerSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    resetPasswordCode: String,
    resetPasswordRequested: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    isResetPasswordRequested: Boolean,
    lockedUntil: Date,
    emailVerificationCode: String,
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
exports.CustomerSchema = CustomerSchema;
CustomerSchema.methods.unsafeFields = function () {
    return [
        'password',
        'emailVerificationCode',
        'resetPasswordCode',
        'isResetPasswordRequested',
        'updatedAt',
    ];
};
CustomerSchema.methods.generateSession = function (loginChannel = '', channelAccessToken = '', channelRefreshToken = '') {
    return __awaiter(this, void 0, void 0, function* () {
        // create session
        const userSession = new CustomerSession_1.CustomerSession();
        userSession.email = this.email;
        userSession.token = string_1.generateRandomString(20);
        userSession.userId = this.id;
        userSession.loginChannel = loginChannel;
        userSession.channelAccessToken = channelAccessToken;
        userSession.channelRefreshToken = channelRefreshToken;
        try {
            const session = yield userSession.save();
            return session;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    });
};
CustomerSchema.statics.getActiveUser = function (userId = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const user = Customer.findOne({ _id: userId, isActive: true });
        return user;
    });
};
CustomerSchema.statics.format = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        let userObject = user.toObject();
        // @ts-ignore
        let unsafeFields = user.unsafeFields();
        unsafeFields.forEach(key => delete userObject[key]);
        return userObject;
    });
};
const Customer = mongoose_1.default.model('customer', CustomerSchema);
exports.Customer = Customer;

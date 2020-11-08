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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const string_1 = require("../util/string");
const UserSession_1 = require("./UserSession");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    resetPasswordRequested: {
        type: Boolean,
        required: true,
        default: false
    },
    isLocked: {
        type: Boolean,
        required: true,
        default: false
    },
    lockedUntil: {
        type: Date,
        required: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });
exports.UserSchema = UserSchema;
UserSchema.methods.unsafeFields = function () {
    return [
        'password',
        'emailVerificationCode',
        'resetPasswordCode',
        'isResetPasswordRequested',
        'updatedAt',
    ];
};
UserSchema.methods.generateSession = function (loginChannel = '', channelAccessToken = '', channelRefreshToken = '') {
    return __awaiter(this, void 0, void 0, function* () {
        // create session
        const userSession = new UserSession_1.UserSession();
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
UserSchema.statics.format = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        let userObject = user.toObject();
        // @ts-ignore
        let unsafeFields = user.unsafeFields();
        unsafeFields.forEach(key => delete userObject[key]);
        return userObject;
    });
};
UserSchema.methods.createUser = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = string_1.hashPassword(user.password);
        const userRow = new User();
        userRow.firstName = user.firstName;
        userRow.lastName = user.lastName;
        userRow.email = user.email;
        userRow.role = user.role;
        userRow.password = hashedPassword;
        userRow.isActive = true;
        // check if email exist
        const userExist = yield User.findOne({ email: userRow.email });
        if (userExist) {
            return userExist;
        }
        try {
            yield userRow.save();
            return userRow;
        }
        catch (e) {
            throw new Error(e);
        }
    });
};
// @ts-ignore
UserSchema.statics.getActiveUser = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ id, isActive: true });
    });
};
const User = mongoose_1.default.model('user', UserSchema);
exports.User = User;

import mongoose, {Document, Schema} from "mongoose";
import {generateRandomString} from "../util/string";
import {CustomerSession} from "./CustomerSession";

/**
 * @todo
 * add login history
 */

interface ICustomer extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    resetPasswordRequested: string;
    resetPasswordCode: string;
    emailVerificationCode: string
    isLocked: boolean;
    lockedUntil: string;
    isActive: boolean;
    isEmailVerified: boolean;
    isResetPasswordRequested: boolean;
    createdAt: Date;
    updatedAt: Date;
    format: (ICustomer) => ICustomer
    createUser: any
    generateSession: any
    getActiveUser: any
}

const CustomerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    resetPasswordCode: String,
    resetPasswordRequested: {type: Boolean, default: false},
    isLocked: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    isEmailVerified: {type: Boolean, default: false},
    isResetPasswordRequested: Boolean,
    lockedUntil: Date,
    emailVerificationCode: String,
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

CustomerSchema.methods.unsafeFields = function () {
    return [
        'password',
        'emailVerificationCode',
        'resetPasswordCode',
        'isResetPasswordRequested',
        'updatedAt',
    ];
};

CustomerSchema.methods.generateSession = async function (loginChannel: string = '', channelAccessToken: string = '', channelRefreshToken: string = '') {
// create session
    const userSession = new CustomerSession();
    userSession.email = this.email;
    userSession.token = generateRandomString(20);
    userSession.userId = this.id;
    userSession.loginChannel = loginChannel;
    userSession.channelAccessToken = channelAccessToken;
    userSession.channelRefreshToken = channelRefreshToken;

    try {
        const session = await userSession.save();
        return session;
    } catch (e) {
        console.log(e);
        return null;
    }

};

CustomerSchema.statics.getActiveUser = async function (userId: string = '') {
    return Customer.findOne({_id: userId, isActive: true});

};
CustomerSchema.statics.format = async function (user) {
    // @ts-ignore
    let userObject = user.toObject();
    // @ts-ignore
    let unsafeFields = user.unsafeFields();
    unsafeFields.forEach(key => delete userObject[key]);

    return userObject;
};
const Customer = mongoose.model<ICustomer>('customer', CustomerSchema);
export {Customer, CustomerSchema}

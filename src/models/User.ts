import mongoose, {Document, Schema} from "mongoose";
import {UserSession} from "./UserSession";
import {generateRandomString, hashPassword} from "../helpers/string";

export interface IUser extends Document {
    userName: string;
    firstName: string;
    lastName: string;
    bio: string;
    address: string;
    city: string;
    country: string;
    education: string;
    work: string;
    email: string;
    password: string;
    about: string;
    friends: string;
    media: { filename: string, }[],
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    format: (IUser) => IUser;
    // user for cli command
    createUser: any;
    generateSession: any;
}

const UserSchema = new Schema({
    userName: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    media: {type: Array},
    bio: {type: String},
    address: {type: String},
    city: {type: String},
    country: {type: String},
    education: {type: Array},
    work: {type: Array},
    email: {type: String, required: [true, 'Why no Email ?']},
    password: {type: String, min: [8, 'Too few eggs'], required: [true, 'Why no Password ?']},
    about: {type: String},
    friends: {type: Array},
    sessionId: {type: String},
    isActive: {type: Boolean, required: true, default: true,},
    failedTriesCount: {type: Number},
    lastFailedLoginAt: {type: Date}
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

UserSchema.methods.unsafeFields = function () {
    return [
        'password',
        'emailVerificationCode',
        'resetPasswordCode',
        'isResetPasswordRequested',
        'updatedAt',
    ];
};

UserSchema.methods.generateSession = async function (loginChannel: string = '', channelAccessToken: string = '', channelRefreshToken: string = '') {
// create session
    const userSession = new UserSession();
    userSession.email = this.email;
    userSession.token = generateRandomString(20);
    userSession.userId = this.id;
    userSession.loginChannel = loginChannel;
    userSession.channelAccessToken = channelAccessToken;
    userSession.channelRefreshToken = channelRefreshToken;

    try {
        const session = await userSession.save();
        return session;
    } catch (error) {
        console.log(error);
        return null;
    }
};

UserSchema.statics.format = async function (user) {
    // @ts-ignore
    let userObject = user.toObject();
    // @ts-ignore
    let unsafeFields = user.unsafeFields();
    unsafeFields.forEach(key => delete userObject[key]);

    return userObject;
};

UserSchema.methods.createUser = async function (user: IUser) {
    const hashedPassword = hashPassword(user.password);
    const userData = new User();
    userData.userName = user.userName;
    userData.firstName = user.firstName;
    userData.lastName = user.lastName;
    userData.email = user.email;
    userData.password = hashedPassword;
    userData.isActive = true;

    // check if email exist

    const userExist = await User.findOne({email: userData.email});
    if (userExist) {
        return userExist;
    }


    try {
        await userData.save();
        return userData

    } catch (e) {
        throw new Error(e);
    }
};

const User = mongoose.model<IUser>('User', UserSchema);

export {User}
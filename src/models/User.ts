import mongoose, {Document, Schema} from "mongoose";
import {generateRandomString, hashPassword} from "../util/string";
import {UserSession} from "./UserSession";

interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    resetPasswordRequested: string;
    isLocked: boolean;
    lockedUntil: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    format: (IUser) => IUser
    createUser: any
    generateSession: any
}


const UserSchema = new Schema({
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
    } catch (e) {
        console.log(e);
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
    const userRow = new User();
    userRow.firstName = user.firstName;
    userRow.lastName = user.lastName;
    userRow.email = user.email;
    userRow.role = user.role;
    userRow.password = hashedPassword;
    userRow.isActive = true;

    // check if email exist

    const userExist = await User.findOne({email: userRow.email});
    if (userExist) {
        return userExist;
    }

    try {
        await userRow.save();
        return userRow

    } catch (e) {
        throw new Error(e);
    }
};

// @ts-ignore
UserSchema.statics.getActiveUser = async function (id: number) {
    return await User.findOne({id, isActive: true});
};


const User = mongoose.model<IUser>('user', UserSchema);

export {User, IUser, UserSchema}
import mongoose, {Document,Schema} from "mongoose";
import {UserSession} from "./UserSession";
import {generateRandomString, hashPassword} from "../helpers/string";


// @todo check if fields are not empty
// @todo friends logic as array inside user schema
// @todo user photos as albums
// @todo user posts and comments

interface IUser extends Document {
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
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    format: (IUser) => IUser;
    createUser: any;
    generateSession: any;
}

const UserSchema = new Schema({
    userName: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    bio: {type: String},
    address: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    education: {type: Array},
    work: {type: Array},
    email: {type: String, required: [true, 'Why no Email ?']},
    password: {type: String, min: [8, 'Too few eggs'], required: [true, 'Why no Password ?']},
    about: {type: String},
    friends: {type: Array},
    sessionId: {type: String},
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
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
    const userRow = new User();
    userRow.firstName = user.firstName;
    userRow.lastName = user.lastName;
    userRow.email = user.email;
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

const User = mongoose.model<IUser>('User', UserSchema);

export {User}
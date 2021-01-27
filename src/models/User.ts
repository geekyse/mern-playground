import mongoose, {Document, Schema} from "mongoose";
import {UserSession} from "./UserSession";
import {generateRandomString, hashPassword} from "../util/string";

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
    media: { filename: string, }[],
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    format: (User: IUser) => IUser;
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
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false,});

UserSchema.methods.unsafeFields = function () {
    return [
        'password',
        'emailVerificationCode',
        'resetPasswordCode',
        'isResetPasswordRequested',
        'updatedAt',
    ];
};

UserSchema.methods.generateSession = async function () {
// create session
    const Session = new UserSession();
    Session.email = this.email;
    Session.token = generateRandomString(20);
    Session.userId = this.id;

    try {
        return await Session.save();
    } catch (error) {
        console.log(error);
        return null;
    }
};

UserSchema.statics.format = async function (user: any) {
    let userObject = user.toObject();
    let unsafeFields = user.unsafeFields();
    unsafeFields.forEach((key: string | number) => delete userObject[key]);
    return userObject;
};

// user for cli command to create admin
UserSchema.methods.createUser = async function (user: IUser) {
    const hashedPassword = hashPassword(user.password);
    const userData = new User();
    userData.userName = user.userName;
    userData.firstName = user.firstName;
    userData.lastName = user.lastName;
    userData.email = user.email;
    userData.password = hashedPassword;
    userData.isActive = true;

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

UserSchema.statics.getActiveUser = async function (id: number) {
    return await User.findOne({id, isActive: true});
};

const User = mongoose.model<IUser>('user', UserSchema);

export {User, IUser, UserSchema}

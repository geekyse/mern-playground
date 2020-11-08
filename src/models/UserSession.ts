import mongoose, {Document, Schema} from "mongoose";


/**
 * @todo
 * add login history
 */

interface IUserSession extends Document {
    email: string;
    userId: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    loginChannel: string;
    channelAccessToken: string;
    channelRefreshToken: string;
}

const UserSessionSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    loginChannel: {
        type: String,
        required: false,
    },
    channelAccessToken: {
        type: String,
        required: false,
    },
    channelRefreshToken: {
        type: String,
        required: false,
    },

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const UserSession = mongoose.model<IUserSession>('user_session', UserSessionSchema);
export {UserSession, IUserSession}
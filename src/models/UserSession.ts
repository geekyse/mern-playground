import mongoose, {Document, Schema} from "mongoose";

interface IUserSession extends Document {
    email: string;
    userId: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSessionSchema = new Schema({
    email:  {type: String, required: true,},
    userId: {type: String, required: true,},
    token:  {type: String, required: true,},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

const UserSession = mongoose.model<IUserSession>('user_session', UserSessionSchema);
export {UserSession, IUserSession}
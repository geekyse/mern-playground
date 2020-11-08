import mongoose, {Document, Schema} from "mongoose";


interface IMessage extends Document {
    name: string;
    email: string;
    message: string;
}


const ContactMessageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const ContactMessage = mongoose.model<IMessage>('contact_message', ContactMessageSchema);

export {ContactMessage, IMessage, ContactMessageSchema}

import mongoose, {Document, Schema} from "mongoose";

interface INewsletterSubscriber extends Document {
    email: string;
    verificationCode: string
    isVerified: boolean;
}


const NewsletterSubscriberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    verificationCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        required: true,
        index: true
    },

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const NewsletterSubscriber = mongoose.model<INewsletterSubscriber>('newsletter_user', NewsletterSubscriberSchema);

export {NewsletterSubscriber, INewsletterSubscriber, NewsletterSubscriberSchema}
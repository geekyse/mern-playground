import mongoose, {Document, Schema} from "mongoose";

interface IStore extends Document {
    title: string;
    code: string;
    currencies: [],
    defaultCurrency: string,
    paymentMethods: [],
    shippingMethods: [],
    languages: [],
    defaultLanguage: string,
    isPublished: boolean;
}

const StoreSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    currencies: {
        type: Array,
        required: true,
    },
    defaultCurrency: {
        type: String,
        required: true,
    },
    languages: {
        type: Array,
        required: true,
    },
    defaultLanguage: {
        type: String,
        required: true,
    },
    paymentMethods: {
        type: Array,
        required: true,
    },
    shippingMethods: {
        type: Array,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        index: true
    },

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const Store = mongoose.model<IStore>('store', StoreSchema);

export {Store, IStore, StoreSchema}
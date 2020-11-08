import mongoose, {Document, Schema} from "mongoose";

interface ISettingGeneral extends Document {
    storeName: string;
    contactEmail: string;
    address: {
        phone: string,
        addressLine1: string,
        addressLine2: string,
        city: string,
        country: string,
        state: string,
        zipcode: string,
    },
    formats: {
        timezone: string,
        unitSystem: string,
        defaultWeightUnit: string,
    },
    currency: {
        defaultCurrency: string,
        otherCurrencies: string[],
    }
}


const SettingGeneralSchema = new Schema({
    storeName: {
        type: String,
        required: false,
    },
    contactEmail: {
        type: String,
        required: false,
    },
    address: {
        phone: {
            type: String,
            required: false,
        },
        addressLine1: {
            type: String,
            required: false,
        },
        addressLine2: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        zipcode: {
            type: String,
            required: false,
        },
    },
    formats: {
        timezone: {
            type: String,
            required: false,
        },
        unitSystem: {
            type: String,
            required: false,
        },
        defaultWeightUnit: {
            type: String,
            required: false,
        },
    },
    currency: {
        defaultCurrency: {
            type: String,
            required: false,
        },
        otherCurrencies: Array,
    }

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const SettingGeneral = mongoose.model<ISettingGeneral>('setting_general', SettingGeneralSchema);

export {SettingGeneral, ISettingGeneral, SettingGeneralSchema}
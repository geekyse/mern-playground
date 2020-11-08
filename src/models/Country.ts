import mongoose, {Document, Schema} from "mongoose";

interface ICountry extends Document {
    name: string;
    code: string;
    isPublished: boolean;
}


const CountrySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    isPublished: {
        type: Boolean,
        required: true,
        index: true
    },

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const Country = mongoose.model<ICountry>('country', CountrySchema);

export {Country, ICountry, CountrySchema}
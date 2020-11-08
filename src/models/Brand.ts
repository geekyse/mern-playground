import mongoose, {Document, Schema} from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

interface IBrand extends Document {
    name: string;
    logo: string;
    about: string;
    slug: string;
    langs: object;
}


const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    slug: {type: String, slug: "name", unique: true, slugPaddingSize: 4, permanent: true},
    langs: {
        type: Object,
        required: false,
        index: true,
    }

}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});


const Brand = mongoose.model<IBrand>('brand', BrandSchema);

export {Brand, IBrand, BrandSchema}
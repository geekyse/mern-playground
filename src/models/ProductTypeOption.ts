import mongoose, {Document} from "mongoose";

const {Schema} = mongoose;

interface IProductTypeOption extends Document {
    title: string;
    code: string;
    type: string;
    langs: object;

}

const ProductTypeOptionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            required: true,
        },
        langs: {
            type: Object,
            required: false,
            index: true,
        },
    },
    {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false}
);

const ProductTypeOption = mongoose.model<IProductTypeOption>('product_type_option', ProductTypeOptionSchema);
export {ProductTypeOption}
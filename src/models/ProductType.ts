import mongoose, {Document} from "mongoose";

const {Schema} = mongoose;

interface IProductType extends Document {
    title: string;
    description: string;
    baseOption: string;
    options: Object[];

}

const ProductTypeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        baseOption: {
            type: String,
            required: false,
        },
        options: {
            type: Array,
            required: false,
        },
    },
    {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false}
);

const ProductType = mongoose.model<IProductType>('product_type', ProductTypeSchema);
export {ProductType}
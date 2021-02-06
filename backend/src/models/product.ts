import mongoose, {Document, Schema} from "mongoose";

interface IProduct extends Document {
    name: string;
    media: string;
    // media: {
    //     filename: string,
    // }[],
    quantity: number;
    price: {
        sellPrice: number,
        costPrice: number,
    },
    type: string;
    brand: string;
    vendor:string;
    longDescription: string;
    shortDescription: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema({
    name: {type: String, required: true},
    media: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number},
    type: {type: String},
    vendor: {type: String},
    brand: {type: String, required: true},
    longDescription: {type: Array},
    shortDescription: {type: String},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

const Product = mongoose.model<IProduct>('product', ProductSchema);

export {Product, IProduct, ProductSchema}
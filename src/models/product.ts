import mongoose, {Document, Schema} from "mongoose";

interface IProduct extends Document {
    name: string;
    brand: string;
    images: string;
    quantity: string;
    longDescription: string;
    shortDescription: string;
    price: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    quantity: {type: Number, required: true},
    images: {type: String, required: true},
    longDescription: {type: Array},
    shortDescription: {type: String},
    price: {type: String},
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}, versionKey: false});

const Product = mongoose.model<IProduct>('product', ProductSchema);

export {Product, IProduct, ProductSchema}
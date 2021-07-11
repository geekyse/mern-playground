import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

interface IProduct extends Document {
  title: string;
  userId: string;
  url: string;
  urlHash: string;
  description: string;
  vendor: string;
  brand: string;
  category: string;
  type: string;
  isPublished: boolean;
  swatch: {
    colors: string[],
    sizes:string[],
    styles:string[]
  }
  price: {
    sellPrice: number,
    costPrice: number,
  },
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PriceSchema = {
  sellPrice: { type: Number, required: true },
  costPrice: { type: Number, required: false },
};

const SwatchSchema = {
  colors: { type: Array, required: true },
  sizes:  { type: Array, required: false },
  styles: { type: Array, required: false },
};

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      text: true,
      index: true,
    },
    userId: {
      type: String,
      required: false,
      index: true,
    },
    url: {
      type: String,
      required: false,
      index: true,
      unique: true,
    },
    urlHash: {
      type: String,
      required: false,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      text: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      index: true,
    },
    vendor: {
      type: String,
      required: true,
      index: true,
    },
    brand: {
      type: String,
      required: false,
      index: true,
    },
    price: PriceSchema,
    swatch: SwatchSchema,
  }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false });


const Product = mongoose.model<IProduct>('product', ProductSchema);
export { Product, IProduct };

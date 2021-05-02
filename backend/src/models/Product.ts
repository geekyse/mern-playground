import mongoose, { Document } from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

const { Schema } = mongoose;

interface IProduct extends Document {
  title: string;
  url: string;
  urlHash: string;
  description: string;
  vendor: string;
  brand: string;
  type: string;
  category: string;
  isPublished: boolean;
  price: {
    sellPrice: number,
    costPrice: number,
  },
}


const PriceSchema = {
  sellPrice: {
    type: Number,
    required: true,
  },
  costPrice: {
    type: Number,
    required: false,
  },
};

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      text: true,
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
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, versionKey: false },
);

// @ts-ignore
ProductSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
// @ts-ignore
ProductSchema.set('toJSON', {
  virtuals: true,
});

ProductSchema.set('toObject', {
  virtuals: true,
});

ProductSchema.index({ name: 'text', 'description': 'text', 'longDescription': 'text' });


const Product = mongoose.model<IProduct>('product', ProductSchema);
export { Product, IProduct };

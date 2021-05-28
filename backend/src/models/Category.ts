import mongoose, { Document, Schema } from 'mongoose';

interface ICategory extends Document {
  title: string;
  description: string;
}

const CategorySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false,
  });

const Category = mongoose.model<ICategory>('category', CategorySchema);

export { Category, ICategory, CategorySchema };

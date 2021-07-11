import mongoose, { Document, Schema } from 'mongoose';

interface ISwatch extends Document {
  title: string;
  type: string;
  group: string;
  description: string;
}

const SwatchSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    group: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false,
  });

const Swatch = mongoose.model<ISwatch>('swatch', SwatchSchema);

export { Swatch, ISwatch, SwatchSchema };

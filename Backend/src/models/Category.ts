import mongoose, { Schema, InferSchemaType } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, required: true },
}, { timestamps: true });

export type CategoryDoc = InferSchemaType<typeof CategorySchema> & { _id: mongoose.Types.ObjectId };

export const CategoryModel = mongoose.models.Category || mongoose.model('Category', CategorySchema);
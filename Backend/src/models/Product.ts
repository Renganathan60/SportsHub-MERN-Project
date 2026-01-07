import mongoose, { Schema, InferSchemaType } from 'mongoose';

const ProductSchema = new Schema({
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: false },
  imageUrl: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  type: { type: String, required: true },
}, { timestamps: true });

export type ProductDoc = InferSchemaType<typeof ProductSchema> & { _id: mongoose.Types.ObjectId };

export const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);



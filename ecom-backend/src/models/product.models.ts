import mongoose, { Document, Schema, model } from "mongoose";

export enum Category {
  Electronics = "electronics",
  Fashion = "fashion",
  Home = "home",
  Books = "books",
}

interface ProductDocument extends Document {
  title: string;
  description: string;
  category: Category;
  quantity: number;
  price: number;
  discountPercentage: number;
  tags: string[];
  imageUrls: string[];
  warrantyInformation: string;
  isActive: boolean;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(Category),
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    tags: {
      type: [String],
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    warrantyInformation: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model<ProductDocument>("Product", productSchema);

export default Product;

// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  hasDiscount: Boolean,
  discountPrice: Number,
  marketplaceName: String,
  category: String,
  mainCategory: String,
  subCategory: String,
  image: String,
  inStock: Boolean,
  unit: String,
  rating: Number,
  distanceKm: Number
});

const Product = mongoose.model('Product', productSchema);

export default Product;

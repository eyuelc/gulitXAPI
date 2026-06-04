import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Number, ref: 'Product' },
      quantity: { type: Number, required: true },
      name: { type: String }, // Store name for historical record
      price: { type: Number },
      image: String
    }
  ],
  total: { type: Number, required: true },
  deliveryFee: { type: Number, default: 15 },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);

import Order from '../models/Order.js';

export const createOrder = async (req, res, next) => {
  try {
    const { userId, items, total, deliveryFee } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: "Order must have items" });
    }

    const newOrder = new Order({ userId, items, total, deliveryFee });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    next(err);
  }
};

export const getOrdersByUserId = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
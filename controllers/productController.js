import Product from '../models/Product.js';

// GET /products?name=...&category=...
export const getProducts = async (req, res, next) => {
  try {
    const { name, category } = req.query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // case-insensitive regex search
    }
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// POST /products
export const newProducts = async (req, res, next) => {
  try {
    const { name, price, hasDiscount, discountPrice, marketplaceName, category, mainCategory, subCategory, image, inStock, unit, rating, distanceKm } = req.body;

    if (!name || !price) {
      const error = new Error('Name and price are required');
      error.status = 400;
      throw error;
    }

    // Auto-generate id by finding max existing id + 1 (optional)
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      id: newId,
      name,
      price,
      hasDiscount,
      discountPrice,
      marketplaceName,
      category,
      mainCategory,
      subCategory,
      image,
      inStock,
      unit,
      rating,
      distanceKm
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// GET /products/:id
export const getProductById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.findOne({ id });

    if (!product) {
      const error = new Error(`Product with id ${id} not found`);
      error.status = 404;
      throw error;
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// PUT /products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;

    const updatedProduct = await Product.findOneAndUpdate({ id }, updates, { new: true });

    if (!updatedProduct) {
      const error = new Error(`Product with id ${id} not found`);
      error.status = 404;
      throw error;
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// DELETE /products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Product.findOneAndDelete({ id });

    if (!deleted) {
      const error = new Error(`Product with id ${id} not found`);
      error.status = 404;
      throw error;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

import express from 'express'
import { getProducts, newProducts, getProductById, updateProduct, deleteProduct } from './controllers/productController.js';

const router = express.Router();

router.get('/products', getProducts)
router.post('/products', newProducts)
router.get('/products/:id', getProductById)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router;
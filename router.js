import express from 'express'
import { getProducts, newProducts, getProductById, updateProduct, deleteProduct } from './controllers/productController.js';
import { registerUser, loginUser } from './controllers/userController.js';
import { createOrder, getOrdersByUserId } from './controllers/orderController.js';


const router = express.Router();

router.get('/products', getProducts)
router.post('/products', newProducts)
router.get('/products/:id', getProductById)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

router.post('/orders', createOrder);
router.get('/orders/:userId', getOrdersByUserId);

export default router;
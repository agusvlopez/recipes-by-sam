//se va a encargar de hacer el merge entre la url o uri y el controlador
// voy a decirle a node que me permita crear rutas:

import express from 'express';
import ProductsController from '../controllers/products.js'
import ProductsReviewRoute from './productsReviews.js';
import { validateCreateProduct } from '../middleware/products.js';
import { verifySession } from '../middleware/account.js';
import multer from 'multer';

//aca creamos una ruta
const route = express.Router();

const storage = multer.memoryStorage();

const fileUpload = multer().single('file');

route.get('/products', ProductsController.getProducts);
route.post('/products', fileUpload, verifySession, ProductsController.createProduct);

route.get('/products/:idProduct', ProductsController.getProductByID);
route.delete('/products/:idProduct', verifySession, ProductsController.deleteProduct);
route.put('/products/:idProduct', fileUpload, verifySession, ProductsController.updateProduct);

export default route;
//se va a encargar de hacer el merge entre la url o uri y el controlador
// voy a decirle a node que me permita crear rutas:

import express from 'express';
import ProductsController from '../controllers/products.js'
import ProductsReviewRoute from './productsReviews.js';

//aca creamos una ruta
const route = express.Router();

//aca decidimos que queremos hacer:
route.get('/products', ProductsController.getProducts);
route.post('/products', ProductsController.createProduct);
route.get('/products/:idProduct', ProductsController.getProductByID);

route.use('/products/', ProductsReviewRoute);
//exportamos la ruta
export default route;
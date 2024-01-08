//se va a encargar de hacer el merge entre la url o uri y el controlador
// voy a decirle a node que me permita crear rutas:

import express from 'express';
import ProductsController from '../controllers/products.js'
import ProductsReviewRoute from './productsReviews.js';
import { accedio, isAdmin } from '../middleware/acceso.js';
import { validateCreateProduct } from '../middleware/products.js';
import { verifySession } from '../middleware/account.js';

//aca creamos una ruta
const route = express.Router();

// function userData(req, res, next){
//     req.user = {
//         name: "Ana Diaz"
//     }
//     next();
// }

//aca decidimos que queremos hacer:
route.get('/products', [verifySession], ProductsController.getProducts);
route.post('/products', [validateCreateProduct], ProductsController.createProduct);
route.get('/products/:idProduct', ProductsController.getProductByID);

route.use('/products/', ProductsReviewRoute);
//exportamos la ruta
export default route;
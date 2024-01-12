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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    }
});

const fileUpload = multer({ storage }).single('file');

route.use('/products', [verifySession]);

//route.all('/products', [verifySession]);

// function userData(req, res, next){
//     req.user = {
//         name: "Ana Diaz"
//     }
//     next();
// }

//aca decidimos que queremos hacer:
route.get('/products', ProductsController.getProducts);
route.post('/products', fileUpload, ProductsController.createProduct);

route.get('/products/:idProduct', [validateCreateProduct], ProductsController.getProductByID);

route.use('/products', ProductsReviewRoute);

//exportamos la ruta
export default route;
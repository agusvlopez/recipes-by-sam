import express from 'express';
import ProductsReviewController from '../controllers/productsReview.js';

const route = express.Router();

route.route('/:idProduct/reviews')
.get(ProductsReviewController.getReviews)
.post(ProductsReviewController.createReview)

// route.get('/:idProduct/reviews', function(req,res){

//     res.json(req.params);
// });

export default route;
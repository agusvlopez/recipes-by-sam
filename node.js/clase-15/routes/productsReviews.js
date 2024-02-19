import express from 'express';
import ProductsReviewController from '../controllers/productsReview.js';

const route = express.Router();

route.route('/products/:idProduct/reviews')
    .get(ProductsReviewController.getReviews)
    .post(ProductsReviewController.createReview)

route.get('/products/reviews/stadistic', ProductsReviewController.getReviewsStadistic);

export default route;
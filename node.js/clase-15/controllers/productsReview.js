import ProductReviewsService from '../services/productReviews.js';

function getReviews(req, res) {
    const { idProduct } = req.params;

    ProductReviewsService.findReviews(idProduct)
        .then(function (reviews) {
            res.json(reviews)
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg })
        })
}

function createReview(req, res) {
    const { idProduct } = req.params;

    ProductReviewsService.createReview(idProduct, req.body)
        .then(function (reviews) {
            res.json(reviews)
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.msg })
        })
}

async function getReviewsStadistic(req, res) {
    try {
        const stadistics = await ProductReviewsService.getReviewsStadistic();
        res.json(stadistics);
    } catch (error) {
        console.error('Error obteniendo estadísticas de productos:', error);
        res.status(500).json({ error: 'Error obteniendo estadísticas de productos' });
    }
}

export default {
    getReviews,
    createReview,
    getReviewsStadistic
}
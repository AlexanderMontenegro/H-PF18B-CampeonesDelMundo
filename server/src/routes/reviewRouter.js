const { Router } = require('express');
const {
    createReview,
    getProductReviews,
    getUserReviews,
    updateReview,
    deleteReview
} = require('../controllers/reviewController'); // Asegúrate de tener estos handlers en tu carpeta de handlers

const reviewRouter = Router();

// Ruta para crear una nueva review
reviewRouter.post('/', createReview);

// Ruta para obtener todas las reviews de un producto específico
reviewRouter.get('/producto/:productId', getProductReviews);

// Ruta para obtener todas las reviews de un usuario específico
reviewRouter.get('/usuario/:userId', getUserReviews);

// Ruta para actualizar una review existente
reviewRouter.put('/:reviewId', updateReview);

// Ruta para eliminar una review
reviewRouter.delete('/:reviewId', deleteReview);

module.exports = reviewRouter;


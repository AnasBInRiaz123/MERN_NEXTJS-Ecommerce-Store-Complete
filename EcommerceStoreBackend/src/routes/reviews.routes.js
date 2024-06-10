const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviews.controller');

// Route for creating a new review
router.post('/reviews', reviewController.createReview);

// Route for getting reviews by product ID and user ID
router.get('/reviews/:productId', reviewController.getReviews);

// Route for updating a review by ID
router.put('/reviews/:id', reviewController.updateReview);

// Route for deleting a review by ID
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;

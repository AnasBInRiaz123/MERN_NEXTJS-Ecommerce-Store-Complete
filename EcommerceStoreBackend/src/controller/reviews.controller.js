const Review = require('../models/reviews.model');

// Create a new review
const createReview = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { productId, userId, rating, comment } = req.body;

    // Create a new review instance
    const review = new Review({
      productId,
      userId,
      rating,
      comment
    });
   
    // Save the review to the database
    const savedReview = await review.save();     

    // Populate the userId field and return the newly created review
    const newReview= await Review.findById(savedReview._id).populate("userId");
    res.status(201).json(newReview);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Get reviews by product ID
const getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find all reviews associated with the given product ID and populate the userId field
    const reviews = await Review.find({ productId }).populate('userId');
    res.json(reviews);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Update a review by ID
const updateReview = async (req, res) => {
  try {
    // Extract data from request body and parameters
    const { rating, comment } = req.body;
    const reviewId = req.params.id;

    // Find the review by ID and update its fields
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true } // Return the updated review
    );

    // Check if review exists
    if (!updatedReview) {
      // Return error message if review not found with status code 404
      return res.status(404).json({ message: 'Review not found' });
    }

    // Return the updated review
    res.json(updatedReview);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Find the review by ID and delete it
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    // Check if review exists
    if (!deletedReview) {
      // Return error message if review not found with status code 404
      return res.status(404).json({ message: 'Review not found' });
    }

    // Return success message
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Export controller functions
module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview
};

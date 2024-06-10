// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for reviews
const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Product model
    required: true
  },
  //dev pulse studio
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the reviews model
const Review = mongoose.model('Review', reviewSchema);

// Export the reviews model
module.exports = Review;

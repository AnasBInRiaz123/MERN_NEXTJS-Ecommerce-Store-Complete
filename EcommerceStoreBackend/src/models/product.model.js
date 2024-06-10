// product.model.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug:{
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Assuming you have a separate category model
    required: true
  },
  imageUrl: {
    type: String
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review' // Assuming you have a separate review model
  }],
  quantity: {
    type: Number,
    default: 0 // Default quantity to 0
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

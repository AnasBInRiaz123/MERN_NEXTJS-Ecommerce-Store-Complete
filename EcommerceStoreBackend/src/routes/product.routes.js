// routes/product.routes.js

const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const  upload = require('../middleware/multer');

// Create a new product
router.post('/products', upload.single('image'), productController.createProduct);

// Get all products
router.get('/products', productController.getAllProducts);

// Get a product by ID
router.get('/products/:id', productController.getProductById);

// Update a product by ID
router.put('/products/:id', upload.single('image'), productController.updateProduct);

// Delete a product by ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;

// category.routes.js

const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

// Create a new category
router.post('/categories', categoryController.createCategory);

// Get all categories
router.get('/categories', categoryController.getAllCategories);

// Update a category by ID
router.put('/categories/:id', categoryController.updateCategoryById);

// Delete a category by ID
router.delete('/categories/:id', categoryController.deleteCategoryById);

module.exports = router;

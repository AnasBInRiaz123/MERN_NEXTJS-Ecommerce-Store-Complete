// Import necessary modules
const Category = require('../models/category.model');
const { toSlug } = require('../utils/helpers');

// Function to create a new category
const createCategory = async (req, res) => {
  try {
    // Extract name from request body and convert it to slug
    const { name } = req.body;
    const slug = toSlug(name);

    // Create a new category instance and save it to the database
    const category = new Category({ name
      , slug
     });
    await category.save();

    // Return the created category with status code 201
    res.status(201).json(category);
  } catch (error) {
    // Handle error if any and return error message with status code 400
    res.status(400).json({ message: error.message });
  }
};

// Function to get all categories
const getAllCategories = async (req, res) => {
  try {
    // Find all categories from the database
    const categories = await Category.find();

    // Return categories as JSON response
    res.json(categories);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};


// Function to update a category by ID
const updateCategoryById = async (req, res) => {
  try {
    // Extract name from request body and convert it to slug
    const { name } = req.body;
    const slug = toSlug(name);

    // Find category by ID from the database
    const category = await Category.findById(req.params.id);

    // Check if category exists
    if (!category) {
      // Return error message if category not found with status code 404
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update category name and slug, then save it to the database
    category.name = name;
    category.slug = slug;
    await category.save();

    // Return the updated category as JSON response
    res.json(category);
  } catch (error) {
    // Handle error if any and return error message with status code 400
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a category by ID
const deleteCategoryById = async (req, res) => {
  try {
    // Find category by ID from the database
    const category = await Category.findById(req.params.id);

    // Check if category exists
    if (!category) {
      // Return error message if category not found with status code 404
      return res.status(404).json({ message: 'Category not found' });
    }

    // Delete the category from the database
    await category.deleteOne();

    // Return success message as JSON response
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Export controller functions
module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById
};

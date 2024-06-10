// Import necessary modules
const Product = require("../models/product.model");
const { uploadImageToCloudinary } = require("../utils/fileUpload");
const { toSlug } = require("../utils/helpers");

// Create a new product
const createProduct = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { name, price, description, category, quantity } = req.body;
    const slug = toSlug(name);
    const file = req.file;

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(file);

    // Create new product instance
    const product = new Product({
      name,
      price,
      description,
      category,
      imageUrl,
      slug,
      quantity,
    });

    // Save the new product to the database
    const resp = await product.save();

    // Retrieve the newly created product with populated category field
    const newProduct = await Product.findById(resp._id).populate("category");
//dev pulse studio
    // Return the newly created product with status code 201
    res.status(201).json(newProduct);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    // Extract category ID from query parameters if available
    const cid = req.query.cid || null;
    const query = {};
    if (cid) {
      query.category = cid;
    }

    // Find products based on query criteria, populate category and reviews fields
    const products = await Product.find({ ...query })
      .populate("category")
      .populate("reviews");

    // Return products as JSON response
    res.json(products);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const productId = req.params.id;

    // Find product by ID and populate category and reviews fields
    const product = await Product.findById(productId)
      .populate("category")
      .populate("reviews");

    // Check if product exists
    if (!product) {
      // Return error message if product not found with status code 404
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the found product as JSON response
    res.json(product);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const productId = req.params.id;

    // Extract file from request
    const file = req.file;

    // Initialize imageUrl variable
    let imageUrl = null;

    // Upload new image to Cloudinary if a file is provided
    if (file) {
      imageUrl = await uploadImageToCloudinary(file);
    }

    // Update imageUrl and slug fields in request body
    if (imageUrl) {
      req.body.imageUrl = imageUrl;
    }
    req.body.slug = toSlug(req.body.name);

    // Find product by ID and update it with new data
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    // Check if product exists
    if (!product) {
      // Return error message if product not found with status code 404
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the updated product as JSON response
    const updatedProduct = await product.populate("category");
    res.status(201).json(updatedProduct);
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const productId = req.params.id;

    // Find product by ID and delete it
    const product = await Product.findByIdAndDelete(productId);

    // Check if product exists
    if (!product) {
      // Return error message if product not found with status code 404
      return res.status(404).json({ message: "Product not found" });
    }

    // Return success message as JSON response
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    // Handle error if any and return error message with status code 500
    res.status(500).json({ message: error.message });
  }
};

// Export controller functions
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

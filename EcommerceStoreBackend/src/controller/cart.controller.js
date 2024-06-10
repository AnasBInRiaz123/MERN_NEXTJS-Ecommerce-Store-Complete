const Cart = require('../models/cart.model');


const addToCart = async (req, res) => {
  try {
    const { userId, productId, cartQuantity } = req.body;
    
    // Check if the product already exists in the user's cart
    let cart = await Cart.findOne({ userId, productId });

    if (cart) {
      // If the product already exists, update the cart quantity by adding the incoming quantity
      cart.cartQuantity += parseInt(cartQuantity);
    } else {
      // If the product doesn't exist, create a new cart item
      cart = new Cart({ userId, productId, cartQuantity });
    }

    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllCartsByUserId = async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming the userId is passed in the request parameters
      const carts = await Cart.find({ userId }).populate('productId');
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const updateCartById = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    const cart = await Cart.findByIdAndUpdate(req.params.id, { userId, cartItems }, { new: true });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteAllCartsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await Cart.deleteMany({ userId });
    res.json({ message: `${result.deletedCount} carts deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addToCart,
  getAllCartsByUserId,
  updateCartById,
  deleteCartById,
  deleteAllCartsByUserId
};
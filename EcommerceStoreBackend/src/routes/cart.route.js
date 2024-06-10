const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart.controller");

// Create a new cart
router.post("/carts", cartController.addToCart);

// Get a cart by ID
router.get("/carts/user/:userId", cartController.getAllCartsByUserId);

// Update a cart by ID
router.put("/carts/:id", cartController.updateCartById);

// Delete a cart by ID
router.delete("/carts/:id", cartController.deleteCartById);
// Delete all cart by userID

router.delete("/carts/user/:userId", cartController.deleteAllCartsByUserId);


module.exports = router;
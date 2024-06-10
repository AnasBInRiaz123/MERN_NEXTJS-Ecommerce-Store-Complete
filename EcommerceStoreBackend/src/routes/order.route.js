const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");

// Create a new order
router.post("/orders", orderController.createOrder);

// Get a order by ID
router.get("/orders/user/:userId", orderController.getOrdersByUserId);
router.get("/orders", orderController.getAllOrders);
// update order
router.put("/orders/:id", orderController.updateOrder);

module.exports = router;
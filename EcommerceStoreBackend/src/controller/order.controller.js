const Order = require('../models/order.model');

// Controller to create a new order
exports.createOrder = async (req, res) => {
    try {
      const { userId, products, totalAmount, shippingAddress, shippingAddressGoogleMap, contactNumber } = req.body;
      
      // Assuming you have a model named Order and want to save the order
      const order = new Order({
        userId,
        products,
        totalAmount,
        shippingAddress,
        shippingAddressGoogleMap,
        contactNumber
      });
  
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error('Error creating order:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  
  
  // exports.getOrdersByUserId = async (req, res) => {
      //     try {
//         const userId = req.params.userId;
//         const order = await Order.find({ userId: userId });
//         if (!order || order.length === 0) {
    //             return res.status(404).json({ success: false, error: 'Orders not found for the specified user' });
    //         }
    //         res.status(200).json({ success: true, data: order });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// };
// Controller to get order by user ID
exports.getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ userId })
        .populate('products.productId').populate('userId')
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Controller to get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('products.productId')
            .populate('userId');
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller to update an order by ID
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updates = req.body;
        const options = { new: true }; // To return the updated document
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, options);
        if (!updatedOrder) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.status(200).json({ updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// Controller to delete an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

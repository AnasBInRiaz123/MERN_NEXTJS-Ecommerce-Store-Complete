const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", // Assuming you have a Product model
                required: true,
            },
            cartQuantity: {
                type: Number,
                required: true,
            }
        }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: [true, 'Address is required']
    },
    shippingAddressGoogleMap: {
        type: String,
        required: [true, 'Address is required']
    },



    contactNumber: {
        type: String,
        required: [true, 'Contact Number is required'],
        validate: {
            validator: function (v) {
                // Define your regex for the contact number format
                // This regex allows for numbers with optional country code (e.g., +1) and area code
                // The number must have 7-15 digits after the country code and area code
                return /^(\+\d{1,3})?(\d{7,15})$/.test(v);
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


})
const Order = mongoose.model("Order", orderSchema)

module.exports = Order;
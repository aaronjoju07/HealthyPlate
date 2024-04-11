const mongoose = require('mongoose');

// Define the order item schema
const orderItemSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity is 1
  },
  price: {
    type: Number,
    required: true,
  },
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  items: [orderItemSchema], // Array of order items
  totalAmount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
    default: 'Pending', // Default status is pending
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
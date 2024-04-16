const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  dishImage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, 
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
  items: [orderItemSchema], 
  totalAmount: {
    type: Number,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  restaurantImage: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
    default: 'Pending', 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

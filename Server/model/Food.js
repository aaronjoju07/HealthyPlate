const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now 
  },
  breakfast: [{
    type: String,
    required: true
  }],
  lunch: [{
    type: String,
    required: true
  }],
  dinner: [{
    type: String,
    required: true
  }]
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;

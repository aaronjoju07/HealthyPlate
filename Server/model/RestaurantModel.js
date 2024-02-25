const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  // user:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required:true
  // }
});

// Define the ingredient schema
const ingredientSchema = new mongoose.Schema({
  ingredientName: {
    type: String,
    required: true,
  },
  gramsOrMl: {
    type: Number,
    required: true,
  },
});

// Define the dish schema
const dishSchema = new mongoose.Schema({
  aboutDish: {
    type: String,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  proteinContent: {
    type: Number,
    required: true,
  },
  sugarContent: {
    type: Number,
    required: true,
  },
  ingredients: [{
    type: ingredientSchema,
  }],
});

// Define the menu schema
const menuSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  menuCategory: {
    type: String,
    required: true,
  },
  availableOrNot: {
    type: Boolean,
    required: true,
  },
  dish: {
    type: dishSchema,
  },
});

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  overallRating: {
    type: Number,
    required: true,
  },
  imageAddress: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  menu: [menuSchema],
});

// Create model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { Restaurant };

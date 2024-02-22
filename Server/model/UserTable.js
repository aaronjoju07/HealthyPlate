const mongoose = require('mongoose');

// Define the tracking schema
const trackingSchema = new mongoose.Schema({
  trackingType: {
    type: String,
    required: true,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  targetedWeight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// Define the schema
const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phnum:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  }],
  tracking: {
    type: trackingSchema,
  },
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Export the model to use in other parts of your application
module.exports = User;

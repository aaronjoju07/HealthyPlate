const mongoose = require('mongoose');

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
  }
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Export the model to use in other parts of your application
module.exports = User;

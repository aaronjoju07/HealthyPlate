const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
  weights: [
    {
      weightValue: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

const Weight = mongoose.model('Weight', weightSchema);

module.exports = { Weight };

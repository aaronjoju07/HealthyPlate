const mongoose = require('mongoose');

const healthTracker = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  current_weight: {
    type: String,
    required: true,
  },
  targeted_weight: {
    type: String,
    required: true,
  },
  current_height: {
    type: String,
    required: true,
  },
  active_factor: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  tracking_type: {
    type: String,
    required: true,
  },
  bmi_result: {
    type: String,
    required: true,
  },
  calculated_calories: {
    type: String,
    required: true,
  },
  daily_progression: [
    {
      date: {
        type: Date,
        required: true,
      },
      progression: {
        type: Number,
        required: true,
      },
    }
  ],
  overall_progression: {
    type: String,
    required: true,
  },
  weight_history: [
    {
      date: {
        type: Date,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
    }
  ],
});

const HealthTracker = mongoose.model('HealthTracker', healthTracker);

module.exports = HealthTracker;

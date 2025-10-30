const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  lastCheckDate: {
    type: Date,
    default: null,
  },
  streak: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Habit', habitSchema);

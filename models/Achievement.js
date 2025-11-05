const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // URL or icon name
    default: 'trophy',
  },
  criteria: {
    type: String, // e.g., 'complete_first_goal', 'habit_streak_7'
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 10,
  },
  category: {
    type: String,
    enum: ['goals', 'habits', 'finance', 'general'],
    default: 'general',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Achievement', achievementSchema);

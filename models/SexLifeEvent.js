const mongoose = require('mongoose');

const sexLifeEventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  tag: {
    type: String,
    required: true,
    enum: ['Romantic', 'Spontaneous', 'Outdoor', 'Anniversary', 'Adventure', 'Other'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SexLifeEvent', sexLifeEventSchema);

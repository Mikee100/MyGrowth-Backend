const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only if not using Google OAuth
    },
  },
  googleId: {
    type: String,
    sparse: true, // Allows multiple null values but unique non-null values
  },
  sexLifePin: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
  }],
  points: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserProfile', userProfileSchema);

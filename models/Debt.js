const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true,
  },
  type: {
    type: String,
    enum: ['loan', 'credit_card', 'mortgage', 'personal', 'other'],
    required: true,
  },
  lender: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  remainingAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  interestRate: {
    type: Number,
    default: 0,
    min: 0,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['active', 'paid', 'defaulted'],
    default: 'active',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Debt', debtSchema);

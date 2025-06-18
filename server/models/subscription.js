// models/subscription.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ['Free', 'Monthly', 'Yearly'],
    default: 'Free',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);

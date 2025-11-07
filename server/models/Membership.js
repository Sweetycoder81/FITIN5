const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add membership plan name'],
    trim: true,
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in months']
  },
  price: {
    type: Number,
    required: [true, 'Please add price']
  },
  features: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Membership', MembershipSchema);
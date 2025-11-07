const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add class name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add class description']
  },
  image: {
    type: String,
    default: 'default-class.jpg'
  },
  duration: {
    type: Number,
    required: [true, 'Please add class duration in minutes']
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer'
  },
  routine: [{
    timeElapsed: Number, // in seconds
    exercise: String,
    instructions: String,
    reps: String
  }],
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Class', ClassSchema);
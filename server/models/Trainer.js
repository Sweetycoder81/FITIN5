const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add trainer name'],
    trim: true
  },
  photo: {
    type: String,
    default: 'default-trainer.jpg'
  },
  specialty: {
    type: String,
    required: [true, 'Please add trainer specialty']
  },
  bio: {
    type: String,
    required: [true, 'Please add trainer bio']
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience']
  },
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String,
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trainer', TrainerSchema);
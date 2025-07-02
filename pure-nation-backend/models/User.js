const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  district: {
    type: String,
    default: ''
  },

  city: {
    type: String,
    default: ''
  },

  volunteerHours: {
    type: Number,
    default: 0
  },

  eventsParticipated: {
    type: Number,
    default: 0
  },

  achievements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement'
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);

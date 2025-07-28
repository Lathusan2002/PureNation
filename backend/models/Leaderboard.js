const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  points: {
    type: Number,
    required: true,
    default: 0
  },

 hoursContributed: {
  type: Number,
  min: 0,
  default: 0,
  required: false
},

  eventsParticipated: {
    type: Number,
    required: true,
    default: 0
  },

  type: {
    type: String,
    enum: ['weekly', 'monthly', 'all-time'],
    required: true
  },

  recordedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);

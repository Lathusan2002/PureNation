const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },

    points: {
      type: Number,
      min: [0, 'Points cannot be negative'],
      default: 0,
    },

    hoursContributed: {
      type: Number,
      min: [0, 'Hours contributed cannot be negative'],
      default: 0,
    },

    eventsParticipated: {
      type: Number,
      min: [0, 'Events participated cannot be negative'],
      default: 0,
    },

    type: {
      type: String,
      enum: {
        values: ['weekly', 'monthly', 'all-time'],
        message: 'Type must be either weekly, monthly, or all-time',
      },
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    recordedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Compound index for querying leaderboard snapshots efficiently
LeaderboardSchema.index({ type: 1, recordedAt: -1 });

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);

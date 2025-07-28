const mongoose = require('mongoose');

const ParticipationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true,
    },
    proofSubmitted: {
      type: Boolean,
      default: null,
    },
    adminApproved: {
      type: Boolean,
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// Prevent duplicate participation of same user in same event
ParticipationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Participation', ParticipationSchema);


const { Schema, model, Types } = require('mongoose');

const submissionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    eventId: {
      type: Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required'],
      minlength: [5, 'Description must be at least 5 characters'],
    },
    photoUrl: {
      type: String,
      required: [true, 'Photo URL is required'],
      trim: true,
    },
    hours: {
      type: Number,
      min: [0, 'Hours must be a non-negative number'],
      required: [true, 'Hours are required'],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: 'Status must be pending, approved, or rejected',
      },
      default: 'pending',
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Optional: prevent duplicate submissions by same user for same event
submissionSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = model('Submission', submissionSchema);


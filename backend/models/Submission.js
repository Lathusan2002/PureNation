const { Schema, model, Types } = require('mongoose');

const submissionSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  eventId: {
    type: Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
    minlength: 5
  },
  photoUrl: {
    type: String,
    required: [true, 'Photo URL is required'],
    trim: true
  },
  hours: {
    type: Number,
    min: [0, 'Hours must be a non-negative number'],
    required: [true, 'Hours are required']
  },
  submittedAt: {
    type: Date,
    default: () => Date.now()
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = model('Submission', submissionSchema);

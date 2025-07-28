const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    icon: {
      type: String,
      required: [true, 'Icon is required'],
      trim: true,
    },

    criteria: {
      type: String,
      required: [true, 'Criteria is required'],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Optional: add index to improve queries sorting by creation date
AchievementSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Achievement', AchievementSchema);


const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      default: '',
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      default: '',
    },

    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
      default: '',
    },

    type: {
      type: String,
      enum: {
        values: ['volunteer', 'sponsor', 'donation', 'campaign'],
        message: 'Type must be one of volunteer, sponsor, donation, or campaign',
      },
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    link: {
      type: String,
      required: [true, 'Link is required'],
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Opportunity', OpportunitySchema);


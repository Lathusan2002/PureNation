const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sponsor name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    logoUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Sponsor', SponsorSchema);
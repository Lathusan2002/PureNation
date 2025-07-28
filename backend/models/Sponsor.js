const { Schema, model } = require('mongoose');

const sponsorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
      index: true,
    },
    organization: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
      // Optional stricter phone validation (uncomment if needed)
      // match: [/^\+?[0-9\s\-]{7,15}$/, 'Invalid phone number'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    logoUrl: {
      type: String,
      trim: true,
      default: '',
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

module.exports = model('Sponsor', sponsorSchema);


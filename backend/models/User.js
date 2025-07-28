const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      index: true,
    },
    country: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    district: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    volunteerHours: {
      type: Number,
      default: 0,
      min: [0, 'Volunteer hours cannot be negative'],
    },
    eventsParticipated: {
      type: Number,
      default: 0,
      min: [0, 'Events participated cannot be negative'],
    },
    joinedEvents: [
      {
        type: Types.ObjectId,
        ref: 'Event',
      },
    ],
    profilePicture: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = model('User', userSchema);


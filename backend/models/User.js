const mongoose = require('mongoose');

const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  volunteerHours: {
    type: Number,
    default: 0,
    min: [0, 'Volunteer hours cannot be negative']
  },
  eventsParticipated: {
    type: Number,
    default: 0,
    min: [0, 'Events participated cannot be negative']
  },
  joinedEvents: [{
    type: Types.ObjectId,
    ref: 'Event'
  }],
  profilePicture: {
    type: String,
    default: null,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = model('User', userSchema);

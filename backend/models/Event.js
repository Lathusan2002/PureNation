const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
      index: true, // for faster querying/sorting by date
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      default: "",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    coverImage: {
      type: String,
      trim: true,
      default: "",
    },
    durationHours: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 hour"],
    },
    type: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
      lowercase: true,
      default: "",
    },
    maxParticipants: {
      type: Number,
      required: [true, "Maximum participants is required"],
      min: [1, "There must be at least 1 participant"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "completed", "cancelled"],
        message: "Status must be either active, completed, or cancelled",
      },
      lowercase: true,
      default: "active",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Event", EventSchema);

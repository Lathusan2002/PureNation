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
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
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
      min: 1,
    },
    type: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
    },
    maxParticipants: {
      type: Number,
      required: [true, "Maximum participants is required"],
      min: 1,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Event", EventSchema);
const Event = require("../models/Event");
const User = require("../models/User");
const Participation = require("../models/Participation");

exports.getAllEvents = async (req, res) => {
  try {
    // Fetch all events sorted by date
    const events = await Event.find().sort({ date: 1 }).lean();

    // Attach approved participant count to each event
    const eventsWithApprovedCount = await Promise.all(
      events.map(async (event) => {
        const approvedCount = await Participation.countDocuments({
          eventId: event._id,
          adminApproved: true,
        });

       const eventsWithApprovedCount = await Promise.all(
  events.map(async (event) => {
    const approvedCount = await Participation.countDocuments({
      eventId: event._id,
      adminApproved: true,
    });

    return {
      _id: event._id,
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time,
      createdBy: event.createdBy,
      approvedParticipants: approvedCount,
    };
  })
);

// Final response
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    const eventsWithApprovedCount = await Promise.all(
      events.map(async (event) => {
        const approvedCount = await Participation.countDocuments({
          eventId: event._id,
          adminApproved: true,
        });

        return {
          ...event.toObject(), // safer than directly spreading mongoose doc
          approvedParticipants: approvedCount,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: eventsWithApprovedCount.length,
      events: eventsWithApprovedCount,
    });

  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
    });
  }
};


// POST /api/events/register
exports.registerForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({
      success: false,
      message: "Both userId and eventId are required.",
    });
  }

  try {
    // Fetch user and event concurrently
    const [user, event] = await Promise.all([
      User.findById(userId),
      Event.findById(eventId),
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // Proceed with registration logic here
    // ...

  } catch (error) {
    console.error("Error during event registration:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while registering for event.",
    });
  }
};


    // Check if event is full
    // Count how many participants are already approved for this event
const approvedCount = await Participation.countDocuments({
  eventId: event._id,
  adminApproved: true,
});

// Check if event capacity is reached
if (event.maxParticipants && approvedCount >= event.maxParticipants) {
  return res.status(400).json({
    success: false,
    message: "Event has reached maximum capacity.",
  });
}

// Check if user is already registered
const existingParticipation = await Participation.findOne({ userId, eventId });
if (existingParticipation) {
  return res.status(409).json({
    success: false,
    message: "User is already registered for this event.",
  });
}


    const participation = new Participation({
      userId,
      eventId,
      proofSubmitted: null,
      adminApproved: null,
      approvedAt: null,
    });

    await participation.save();

    res.status(201).json({
      success: true,
      message:
        "Registered successfully. Pending proof submission and admin approval.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Event registration failed",
      error: error.message,
    });
  }
};

// GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const approvedCount = await Participation.countDocuments({
      eventId: event._id,
      adminApproved: true,
    });

    res.status(200).json({
      ...event.toObject(),
      approvedParticipants: approvedCount,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: err.message });
  }
};

// POST /api/events
exports.createEvent = async (req, res) => {
  const {
    title,
    date,
    location,
    type,
    description,
    durationHours,
    maxParticipants,
  } = req.body;

  const coverImage = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.coverImage || "";

  if (
    !title ||
    !date ||
    !location ||
    !type ||
    !description ||
    !durationHours ||
    !maxParticipants
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided",
    });
  }

  try {
    const event = new Event({
      title,
      date,
      location,
      description,
      durationHours,
      type,
      coverImage,
      maxParticipants,
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

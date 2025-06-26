const Event = require('../models/Event');
const User = require('../models/User');

// GET /api/events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message
    });
  }
};

// POST /api/events/register
exports.registerForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({
      success: false,
      message: 'Both userId and eventId are required'
    });
  }

  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({
        success: false,
        message: 'User or Event not found'
      });
    }

    // Prevent duplicate registrations
    if (event.participants.includes(userId)) {
      return res.status(409).json({
        success: false,
        message: 'User already registered for this event'
      });
    }

    // Add user to event
    event.participants.push(userId);
    await event.save();

    // Update user stats
    user.eventsParticipated = (user.eventsParticipated || 0) + 1;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Successfully registered for the event'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Event registration failed',
      error: error.message
    });
  }
};

const Submission = require('../models/Submission');
const User = require('../models/User');
const Event = require('../models/Event');

// POST /api/proof
exports.submitProof = async (req, res) => {
  const { userId, eventId, description, photoUrl, hours } = req.body;

  if (!userId || !eventId || !description || !photoUrl || !hours) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({
        success: false,
        message: 'User or Event not found'
      });
    }

    const newSubmission = new Submission({
      userId,
      eventId,
      description,
      photoUrl,
      hours
    });

    await newSubmission.save();

    // Update volunteer hours for the user
    user.volunteerHours = (user.volunteerHours || 0) + Number(hours);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Proof submitted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while submitting proof',
      error: error.message
    });
  }
};

const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

exports.getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .sort({ createdAt: -1 }) // optional: newest first
      .lean();

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    console.error('Error fetching involvement opportunities:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch involvement opportunities.',
      error: error.message,
    });
  }
};


// POST /api/join-volunteer
exports.joinVolunteer = async (req, res) => {
  const { userId, opportunityId } = req.body;

  if (!userId || !opportunityId) {
    return res.status(400).json({
      success: false,
      message: 'User ID and Opportunity ID are required.',
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Initialize opportunitiesJoined if undefined
    if (!Array.isArray(user.opportunitiesJoined)) {
      user.opportunitiesJoined = [];
    }

    // Use Set to ensure uniqueness
    const joinedSet = new Set(user.opportunitiesJoined);
    if (!joinedSet.has(opportunityId)) {
      joinedSet.add(opportunityId);
      user.opportunitiesJoined = Array.from(joinedSet);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully joined the opportunity.',
      opportunitiesJoined: user.opportunitiesJoined, // optional to return updated list
    });
  } catch (error) {
    console.error('Error joining opportunity:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to join the opportunity.',
      error: error.message,
    });
  }
};


// POST /api/interest-request
exports.submitInterestRequest = async (req, res) => {
  const { name, email, interest } = req.body;

  // Trim and normalize inputs
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim().toLowerCase();
  const trimmedInterest = interest?.trim();

  // Basic input validation
  if (!trimmedName || !trimmedEmail || !trimmedInterest) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and interest are required.',
    });
  }

  // Simple email format check (can be improved with validator lib)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  try {
    console.log('📥 Interest submission received:', {
      name: trimmedName,
      email: trimmedEmail,
      interest: trimmedInterest,
    });

    // You can optionally store this data in a DB or send email here

    return res.status(200).json({
      success: true,
      message: 'Thank you for your interest. We will contact you shortly.',
    });

  } catch (error) {
    console.error('Error submitting interest request:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit interest request.',
      error: error.message,
    });
  }
};

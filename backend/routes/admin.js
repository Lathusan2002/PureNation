const express = require('express');
const router = express.Router();
const Participation = require('../models/Participation');
const User = require('../models/User');
const Event = require('../models/Event');

// Basic Admin Authentication (hardcoded)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    return res.json({ success: true, message: 'Admin login successful' });
  }
  return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

// Approve participation
router.post('/participation/approve', async (req, res) => {
  const { userId, eventId } = req.body;
  if (!userId || !eventId) {
    return res.status(400).json({ success: false, message: 'userId and eventId are required' });
  }

  try {
    const result = await Participation.updateOne(
      { userId, eventId },
      { adminApproved: true, approvedAt: new Date() }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: 'Participation not found or already approved' });
    }
    res.json({ success: true, message: 'Participation approved' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Approval failed', error: err.message });
  }
});

// Reject participation
router.post('/participation/reject', async (req, res) => {
  const { userId, eventId } = req.body;
  if (!userId || !eventId) {
    return res.status(400).json({ success: false, message: 'userId and eventId are required' });
  }

  try {
    const result = await Participation.updateOne(
      { userId, eventId },
      { adminApproved: false, approvedAt: new Date() }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: 'Participation not found or already rejected' });
    }
    res.json({ success: true, message: 'Participation rejected' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Rejection failed', error: err.message });
  }
});

// Get all pending participations, with approved count per event
router.get('/participations', async (req, res) => {
  try {
    const pending = await Participation.find({ adminApproved: null })
      .populate('userId', 'firstName lastName email') // select only needed fields
      .populate('eventId', 'title date');

    // Get count of approved participations per event
    const approved = await Participation.aggregate([
      { $match: { adminApproved: true } },
      { $group: { _id: "$eventId", approvedCount: { $sum: 1 } } }
    ]);

    // Map eventId to approved count
    const approvedCountMap = {};
    approved.forEach(({ _id, approvedCount }) => {
      approvedCountMap[_id.toString()] = approvedCount;
    });

    res.status(200).json({
      success: true,
      pending,
      approvedCountMap,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch participations', error: error.message });
  }
});

module.exports = router;

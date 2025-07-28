const express = require('express');
const router = express.Router();
const Participation = require('../models/Participation');
const User = require('../models/User');
const Event = require('../models/Event');

// ===============================
// Admin Authentication (Basic)
// ===============================
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    return res.json({ success: true, message: 'Admin login successful' });
  }
  res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

// ===============================
// Approve participation (by body)
// ===============================
router.post('/participation/approve', async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    await Participation.updateOne(
      { userId, eventId },
      { adminApproved: true, approvedAt: new Date() }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Approval failed', error: err.message });
  }
});

// ===============================
// Reject participation (by body)
// ===============================
router.post('/participation/reject', async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    await Participation.updateOne(
      { userId, eventId },
      { adminApproved: false, approvedAt: new Date() }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Rejection failed', error: err.message });
  }
});

// ===============================
// Get all pending participations
// ===============================
router.get('/participations', async (req, res) => {
  try {
    const pending = await Participation.find({ adminApproved: null })
      .populate('userId')
      .populate('eventId');

    const approved = await Participation.find({ adminApproved: true });

    const approvedCountMap = {};
    approved.forEach(p => {
      const e

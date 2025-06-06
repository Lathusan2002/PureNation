// routes/event.js
const express = require('express');
const router = express.Router();

// Dummy in-memory event store
let events = [];

// @route   POST /api/events
// @desc    Create a new event
router.post('/', (req, res) => {
  const { title, date, time, location, description, status, volunteersJoined, volunteersNeeded, sponsor, tags } = req.body;

  if (!title || !date || !location || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    date,
    time,
    location,
    description,
    status,
    volunteersJoined: parseInt(volunteersJoined) || 0,
    volunteersNeeded: parseInt(volunteersNeeded) || 0,
    sponsor,
    tags: tags ? tags.split(',') : []
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// @route   GET /api/events
// @desc    Get all events
router.get('/', (req, res) => {
  res.json(events);
});

module.exports = router;

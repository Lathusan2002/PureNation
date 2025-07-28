const express = require('express');
const router = express.Router();
const upload = require('../middleware/imageUpload');
const {
  getAllEvents,
  createEvent,
  registerForEvent,
  getEventById
} = require('../controllers/eventController');

// =======================
// @route   GET /api/events
// @desc    Retrieve all events (sorted by date)
// @access  Public
// =======================
router.get('/', getAllEvents);

// =======================
// @route   POST /api/events
// @desc    Create a new event (with optional image)
// @access  Admin/Organizer (middleware can be added later)
// =======================
router.post('/', upload.single('coverImage'), createEvent);

// =======================
// @route   POST /api/events/register
// @desc    Register a user for an event
// @access  Authenticated Users
// =======================
router.post('/register', registerForEvent);

// =======================
// @route   GET /api/events/:id
// @desc    Get specific event by ID
// @access  Public
// =======================
router.get('/:id', getEventById);

module.exports = router;

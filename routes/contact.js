// routes/contact.js
const express = require('express');
const router = express.Router();

// Dummy in-memory contact log
let messages = [];

// POST /api/contact
router.post('/', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  const newMessage = {
    id: messages.length + 1,
    email,
    message,
    date: new Date().toISOString()
  };

  messages.push(newMessage);
  console.log('New contact message:', newMessage);

  res.status(200).json({ success: true, message: 'Message received!' });
});

module.exports = router;

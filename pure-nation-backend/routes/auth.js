// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

 // adjust path based on your actual model name

const bcrypt = require('bcryptjs'); // use bcryptjs instead of bcrypt


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Success
    res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email } });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

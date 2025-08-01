const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Store session data
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      district: user.district,
      city: user.city,
      volunteerHours: user.volunteerHours || 0,
      eventsParticipated: user.eventsParticipated || 0
    };

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: req.session.user // optional
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;


    req.session.save(err => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save session', error: err.message });
      }
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: req.session.user
      });
    });

  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// GET /api/auth/status
router.get('/status', (req, res) => {
  if (req.session?.user) {
    return res.status(200).json({
      success: true,
      loggedIn: true,
      user: req.session.user
    });
  }

  return res.status(200).json({
    success: true,
    loggedIn: false,
    message: 'No active session found.'
  });
});
router.post('/logout', (req, res) => {
  if (!req.session) {
    return res.status(400).json({ success: false, message: 'No active session to destroy.' });
  }

  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: 'Logout failed. Please try again.' });
    }

    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: false // set true if you're using HTTPS
    });

    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
  });
});


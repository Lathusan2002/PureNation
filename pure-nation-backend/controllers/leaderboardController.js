const User = require('../models/User');

// Helper function to get filtered leaderboard based on query
function filterLeaderboard(users, type) {
  if (type === 'weekly') {
    return users.sort((a, b) => (b.weeklyHours || 0) - (a.weeklyHours || 0));
  } else if (type === 'monthly') {
    return users.sort((a, b) => (b.monthlyHours || 0) - (a.monthlyHours || 0));
  } else {
    return users.sort((a, b) => (b.volunteerHours || 0) - (a.volunteerHours || 0));
  }
}

function getHoursByType(user, type) {
  if (type === 'weekly') return user.weeklyHours || 0;
  if (type === 'monthly') return user.monthlyHours || 0;
  return user.volunteerHours || 0;
}

// GET /api/leaderboard?type=weekly|monthly|all-time
exports.getLeaderboard = async (req, res) => {
  const { type = 'all-time' } = req.query;

  try {
    const users = await User.find({}, 'firstName lastName volunteerHours eventsParticipated weeklyHours monthlyHours profilePicture').lean();

    const leaderboard = filterLeaderboard(users, type).map(user => {
      const hours = getHoursByType(user, type);
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      console.log('PROFILE', user.profilePicture);
      console.log(`User ID: ${user._id} | Name: ${fullName} | Hours: ${hours} | Events: ${user.eventsParticipated}`);

      return {
        id: user._id,
        name: fullName,
        points: hours * 50,
        eventsParticipated: user.eventsParticipated || 0,
        hoursContributed: hours,
        profilePicture: user.profilePicture || null
      };
    });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard',
      error: error.message
    });
  }
};

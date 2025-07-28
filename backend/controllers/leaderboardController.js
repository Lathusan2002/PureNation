function filterLeaderboard(users, type) {
  // Determine which field to sort by
  let sortField = "volunteerHours";
  if (type === "weekly") sortField = "weeklyHours";
  else if (type === "monthly") sortField = "monthlyHours";

  // Clone the array to avoid mutating the original
  const clonedUsers = users.map(user => ({ ...user }));

  // Sort in descending order based on selected field
  return clonedUsers.sort((a, b) => (b[sortField] || 0) - (a[sortField] || 0));
}


// Helper: Get hours based on type
function getHoursByType(user, type) {
  const hoursMap = {
    weekly: user.weeklyHours,
    monthly: user.monthlyHours,
    total: user.volunteerHours,
  };

  return hoursMap[type] ?? user.volunteerHours ?? 0;
}


// GET /api/leaderboard?type=weekly|monthly|all-time
exports.getLeaderboard = async (req, res) => {
  const { type = "all-time" } = req.query;

  try {
    const users = await User.find(
      {},
      "firstName lastName volunteerHours weeklyHours monthlyHours profilePicture"
    ).lean();

    // Fetch eventsParticipated count per user from Submission collection
    const leaderboard = await Promise.all(
      users.map(async (user) => {
        const distinctEvents = await Submission.distinct("eventId", {
          userId: user._id,
        });
        const hours = getHoursByType(user, type);
        const fullName = `${user.firstName || ""} ${
          user.lastName || ""
        }`.trim();

        return {
          id: user._id,
          name: fullName,
          points: hours * 50,
          eventsParticipated: distinctEvents.length,
          hoursContributed: hours,
          profilePicture: user.profilePicture || null,
        };
      })
    );

    // Sort leaderboard based on hours
    const sortedLeaderboard = filterLeaderboard(leaderboard, type);

    res.json(sortedLeaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
      error: error.message,
    });
  }
};

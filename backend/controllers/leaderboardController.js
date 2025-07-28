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
    // Select relevant fields only
    const users = await User.find({})
      .select("firstName lastName volunteerHours weeklyHours monthlyHours profilePicture")
      .lean();

    // Sort using a helper function (you can plug in filterLeaderboard here)
    const sortedUsers = filterLeaderboard(users, type);

    return res.status(200).json({
      success: true,
      count: sortedUsers.length,
      leaderboard: sortedUsers,
    });

  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard.",
      error: error.message,
    });
  }
};

    // Fetch eventsParticipated count per user from Submission collection
    const leaderboard = await Promise.all(
  users.map(async (user) => {
    const [eventIds, hours] = await Promise.all([
      Submission.distinct("eventId", { userId: user._id }),
      Promise.resolve(getHoursByType(user, type)), // keeps parallel pattern
    ]);

    return {
      id: user._id,
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      points: (hours || 0) * 50,
      eventsParticipated: eventIds.length,
      hoursContributed: hours || 0,
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

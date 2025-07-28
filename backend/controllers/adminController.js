app.post('/api/participation/approve', async (req, res) => {
  const { userId, eventId } = req.body;

  // Input validation
  if (!userId || !eventId) {
    return res.status(400).json({
      success: false,
      message: 'Both userId and eventId must be provided.',
    });
  }

  try {
    const updateData = {
      adminApproved: true,
      approvedAt: new Date(),
    };

    const result = await Participation.updateOne(
      { userId, eventId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Participation record not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Participation approved successfully.',
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error('Error approving participation:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while approving participation.',
    });
  }
});

    // Check if a document was actually updated
    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: 'Participation not found or already approved' })

// For reject
app.post('/api/participation/reject', async (req, res) => {
  const { userId, eventId } = req.body;

  await Participation.updateOne(
    { userId, eventId },
    {
      adminApproved: false,
      approvedAt: new Date()
    }
  );

  res.json({ success: true });
});

const Participation = require('../models/Participation');

app.post('/api/participation/approve', async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Validate input
    if (!userId || !eventId) {
      return res.status(400).json({
        success: false,
        message: 'userId and eventId are required fields.',
      });
    }

    // Update and return the updated document
    const updatedParticipation = await Participation.findOneAndUpdate(
      { userId, eventId },
      {
        $set: {
          adminApproved: true,
          approvedAt: new Date(),
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedParticipation) {
      return res.status(404).json({
        success: false,
        message: 'Participation record not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Participation approved successfully.',
      data: updatedParticipation,
    });
  } catch (err) {
    console.error('Error during participation approval:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while approving participation.',
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

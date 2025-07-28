app.post('/api/participation/approve', async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Validate input
    if (!userId || !eventId) {
      return res.status(400).json({ success: false, message: 'userId and eventId are required' });
    }

    // Attempt to update the participation
    const result = await Participation.updateOne(
      { userId, eventId },
      {
        $set: {
          adminApproved: true,
          approvedAt: new Date()
        }
      }
    );

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

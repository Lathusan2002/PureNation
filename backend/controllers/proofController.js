const submitProof = async (req, res) => {
  try {
    const { email, event, hours, description } = req.body;
    const file = req.file;

    // Step 1: Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Step 2: Normalize email and find user
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with the provided email.",
      });
    }

    const userId = user._id;

    // Continue with your logic here (e.g., saving proof, etc.)
    
    // Example success response (you can replace with your logic)
    return res.status(200).json({ message: "User found, proceed with proof

    const userId = user._id;

    // 3. Validate other fields
    if (!event || !hours || !description || !file) {
      return res
        .status(400)
        .json({ message: "All fields including file are required." });
    }

    const parsedHours = parseFloat(hours);
    if (isNaN(parsedHours) || parsedHours <= 0) {
      return res
        .status(400)
        .json({ message: "Hours must be a positive number." });
    }

    // 4. Find event by title
    const eventData = await Event.findOne({ title: event });
    if (!eventData) {
      return res.status(404).json({ message: "Event not found." });
    }

    // 5. Build photo URL (adjust path if needed)
    const photoUrl = `${req.protocol}://${req.get("host")}/${file.path}`;

    // 6. Create new submission
    const submission = new Submission({
      userId,
      eventId: eventData._id,
      hours: parsedHours,
      description,
      photoUrl,
      fileType: file.mimetype,
      originalFileName: file.originalname,
    });

    await submission.save();

    // 7. Update user's volunteer hours
   const submitProof = async (req, res) => {
  try {
    const { email, event, hours, description } = req.body;
    const file = req.file;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email.",
      });
    }

    const parsedHours = parseFloat(hours);
    if (isNaN(parsedHours) || parsedHours <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid number of hours provided.",
      });
    }

    const newSubmission = new Submission({
      userId: user._id,
      eventId: event,
      hours: parsedHours,
      description: description?.trim() || "",
      proofFile: file ? `/uploads/${file.filename}` : null,
    });

    const submission = await newSubmission.save();

    user.volunteerHours = (user.volunteerHours || 0) + parsedHours;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Proof submitted successfully.",
      submission,
    });
  } catch (error) {
    console.error("Error submitting proof:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit proof.",
      error: error.message,
    });
  }
};

module.exports = { submitProof };

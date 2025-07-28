const Submission = require("../models/Submission");
const User = require("../models/User");
const Event = require("../models/Event");

const submitProof = async (req, res) => {
  try {
    const { email, event, hours, description } = req.body;
    const file = req.file;

    // Validate email presence
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ message: "Valid email is required." });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "No user found with the provided email." });
    }

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
    user.volunteerHours = (user.volunteerHours || 0) + parsedHours;
    await user.save();

    // 8. Send success response
    res.status(201).json({
      message: "Proof submitted successfully!",
      submission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to submit proof",
      error: error.message,
    });
  }
};

module.exports = { submitProof };

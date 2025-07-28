const Sponsor = require("../models/Sponsor");

// POST /api/sponsors
// Submit a new sponsorship form
const Sponsor = require('../models/Sponsor');

exports.submitSponsorship = async (req, res) => {
  const { name, email, organization, phone, message } = req.body;

  // Input validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  try {
    const sponsorData = new Sponsor({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: organization?.trim() || "",
      phone: phone?.trim() || "",
      message: message.trim(),
    });

    await sponsorData.save();

    return res.status(201).json({
      success: true,
      message: "Thank you for your sponsorship interest! We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Sponsorship submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit sponsorship.",
      error: error.message,
    });
  }
};


// GET /api/featured-sponsors
// exports.getFeaturedSponsors = async (req, res) => {
//   try {
//     const sponsors = await Sponsor.find({ featured: true }).lean();

//     res.json(sponsors);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve featured sponsors.',
//       error: error.message,
//     });
//   }
// };

const Sponsor = require('../models/Sponsor');

exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      count: sponsors.length,
      data: sponsors,
    });
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sponsors",
      error: error.message,
    });
  }
};

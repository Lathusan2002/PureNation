const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String },
  district: { type: String },
  city: { type: String },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);



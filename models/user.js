const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  userAddress: String,
  contactNumber: Number,
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);

module.exports = user;

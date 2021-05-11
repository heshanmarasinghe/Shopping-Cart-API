const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: [
    {
      type: String,
      required: true,
    },
  ],
  role: [
    {
      type: String,
      required: true,
    },
  ],
  userName: [
    {
      fisrtName: String,
      lastName: String,
    },
  ],
  userAddress: [
    {
      addLine1: String,
      addLine2: String,
      addLine3: String,
    },
  ],
  password: [
    {
      type: String,
      required: true,
    },
  ],
});

const user = mongoose.model("User", userSchema);

module.exports = user;

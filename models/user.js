const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  role: Number,
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
  password: String,
  telephone: String,
});

const user = mongoose.model("User", userSchema);

module.exports = user;

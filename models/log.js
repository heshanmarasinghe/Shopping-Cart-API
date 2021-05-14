const mongoose = require("mongoose");

const requestLogSchema = new mongoose.Schema({
  request: {
    type: String,
    required: true,
  },
  requestMethod: {
    type: String,
    required: true,
  },
  createdDate: Date
});

const requestLog = mongoose.model("Log", requestLogSchema);

module.exports = requestLog;
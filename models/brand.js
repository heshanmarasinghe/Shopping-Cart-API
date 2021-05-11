const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brandName: {
    type: String,
  },
});

const brand = mongoose.model("Brand", brandSchema);

module.exports = brand;

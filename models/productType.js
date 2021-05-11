const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema({
  productType: {
    type: String,
  },
});

const productType = mongoose.model("ProductType", productTypeSchema);

module.exports = productType;
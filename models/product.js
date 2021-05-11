const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: String,
  productCategory: String,
  productGender: String,
  productBrand: String,
  productPrice: Number,
  productDateAdded: Date,
});

const product = mongoose.model("Product", productSchema);

module.exports = product;

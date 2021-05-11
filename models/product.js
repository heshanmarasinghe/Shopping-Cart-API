const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: String,
  productCategory: String,
  productType: String,
  productBrand: String,
  productPrice: Number,
  productDateAdded: Date,
  productQuantity:Number,
  productManufacturer: String,
});

const product = mongoose.model("Product", productSchema);

module.exports = product;

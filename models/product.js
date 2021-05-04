const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: String,
    productPrice: Number
})

const product = mongoose.model("Product", productSchema);

module.exports = product;
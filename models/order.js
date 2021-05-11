const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerFirstName: {
    type: String,
    required: true,
  },
  customerLastName: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      productId: String,
      productName: String,
      productPrice: Number,
    },
  ],
  customerAddress: String,
  customerEmail: String,
  orderTotal: Number,
  orderCurrency: String,
  orderDateAdded: Date,
  orderPaymentMethod: String,
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;

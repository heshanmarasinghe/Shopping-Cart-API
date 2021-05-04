const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    orderItems : [{
        productId: String,
        productName: String,
        productPrice: Number
    }],    
    orderTotal: Number,
    orderCurrency: String
})

const order = mongoose.model("Order", orderSchema);

module.exports = order;
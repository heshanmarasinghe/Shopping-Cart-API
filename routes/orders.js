const express = require("express");
const Order = require("../models/order");
const ordersRouter = express.Router();
const cors = require("cors");

ordersRouter.use(cors());





//Create a new Order
ordersRouter.post("/", (req, res) => {
  try {
    if (!req.body.firstName) {
      return res.status(400).send("First Name cannot be empty!!!");
    }

    if (!req.body.lastName) {
      return res.status(400).send("Last Name cannot be empty!!!");
    }

    let newOrder = new Order({
      customerId: req.body.customerId,
      customerFirstName: req.body.firstName,
      customerLastName: req.body.lastName,
      customerMobile: req.body.customerMobile,
      customerAddress: req.body.customerAddress,
      customerEmail: req.body.customerEmail,
      orderTotal: req.body.orderTotal,
      orderCurrency: req.body.orderCurrency,
      orderDateAdded: Date.now(),
      orderPaymentMethod: req.body.orderPaymentMethod,
      orderStatus: req.body.orderStatus,
    });

    var orderItemsArray = [];
    req.body.orderItems.forEach(function (item) {
      var obj = {
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        productQty: item.productQty,
      };
      orderItemsArray.push(obj);
    });

    newOrder.orderItems = orderItemsArray;

    newOrder.save();
    return res.status(200).send("Order Created Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});



module.exports = ordersRouter;

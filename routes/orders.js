const express = require("express");
const Order = require("../models/order");
const ordersRouter = express.Router();
const cors = require("cors");

ordersRouter.use(cors());

//Get all Orders
ordersRouter.get("/", async (req, res) => {
  try {
    let orders = await Order.find();
    return res.send(orders);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

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
      customerFirstName: req.body.firstName,
      customerLastName: req.body.lastName,
      orderTotal: req.body.orderTotal,
      customerAddress: req.body.customerAddress,
      customerEmail: req.body.customerEmail,
      orderTotal: req.body.orderTotal,
      orderCurrency: req.body.orderCurrency,
      orderDateAdded: Date.now(),
      orderPaymentMethod: req.body.orderPaymentMethod,
    });

    var orderItemsArray = [];
    req.body.orderItems.forEach(function (item) {
      var obj = {
        productId: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
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

//Delete a Product
ordersRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleteOrder = await Order.findById(id);

    if (deleteOrder == null) {
      return res.status(404).send("Order Not Available!!!");
    }

    deleteOrder.deleteOne({ _id: id });
    return res.status(200).send("Order Deleted Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

module.exports = ordersRouter;

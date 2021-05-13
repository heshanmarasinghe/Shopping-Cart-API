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

//Get Orders Status
ordersRouter.get("/status", async (req, res) => {
  try {
    let orders = await Order.find();

    if (orders == null) {
      return res.status(404).send("Orders Not Available!!!");
    }

    var orderCount = orders.length;
    var totalIncome = 0;

    for (var i = 0; i < orders.length; i++) {
      totalIncome = totalIncome + orders[i].orderTotal;
    }

    return res.send({  orderCount, totalIncome });
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Get Order for Customer
ordersRouter.get("/customer/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedOrder = await Order.find({ customerId: id });

    if (selectedOrder == null) {
      return res.status(404).send("Orders Not Available!!!");
    }

    return res.status(200).send(selectedOrder);
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

//Update a Order Status
ordersRouter.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedOrder = await Order.findById(id);

    if (selectedOrder == null) {
      return res.status(404).send("Order Not Available!!!");
    }

    selectedOrder.set({
      orderStatus: req.body.orderStatus,
    });
    await selectedOrder.save();
    return res.status(200).send("Order Status Updated Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Delete a Order
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

const express = require('express');
const Order = require('../models/order');
const ordersRouter = express.Router();

//Get all Orders
ordersRouter.get('/', async (req, res) => {
    try {
        let orders = await Order.find();
        return res.send(orders);
    }
    catch(ex) {
        return res.status(500).send("Error :" + ex.Message);
    }
})

//Create a new Order
ordersRouter.post('/', (req, res) => {
    try {
        if(!req.body.firstName) {
        return res.status(400)
            .send("First Name cannot be empty!!!");
        }

        if(!req.body.lastName) {
             return res.status(400)
            .send("Last Name cannot be empty!!!");
        }  
        
        // req.body.orderItems.forEach(function(item) {
        //     let orderItem = Order.orderItems[{
        //         productId: item.productId,
        //         productName: item.productName,
        //         productPrice: item.productPrice,
        //     }]; 
        //     console.log(orderItem)
        //   });

    let newOrder = new Order({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        orderTotal: req.body.orderTotal,
        orderCurrency: req.body.orderCurrency,
        orderItems : [{
            productId: req.body.orderItems.productId,
            productName: req.body.orderItems.productName,
            productPrice: req.body.orderItems.productPrice,
        }]     
          
    });

        newOrder.save()
        return res.status(200).send("Order Created Successfully!!");
    }
    catch (ex) {
        return res.status(500).send("Error :" + ex.Message);
    }
    
})

module.exports = ordersRouter;
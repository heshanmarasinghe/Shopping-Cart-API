const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const authentication = require("./middleware/authentication");
const products = require("./routes/products");
const orders = require("./routes/orders");

app.use(express.json());
app.use(authentication);
app.use("/api/products/", products);
app.use("/api/orders/", orders);

 mongoose.connect('mongodb://localhost/ShoppingCart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to Database Successfully...!!"))
.catch((err) => 
    console.log("Error has occured while connecting to the database :", err)
    );

app.listen(port, () => {
    console.log("App listening at :" +port);
})

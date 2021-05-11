const express = require('express');
const app = express();
const port = 3000;

const authentication = require("./middleware/authentication");
const dbConnection = require("./config/db");
const products = require("./routes/products");
const orders = require("./routes/orders");
const categories = require("./routes/categories");
const users = require("./routes/users");
const manufacturers = require("./routes/manufacturers");
const brands = require("./routes/brands");
const productTypes = require("./routes/productTypes");

app.use(express.json());
app.use(authentication);
dbConnection();

app.use("/api/products/", products);
app.use("/api/orders/", orders);
app.use("/api/categories/", categories);
app.use("/api/users/", users);
app.use("/api/manufacturers/", manufacturers);
app.use("/api/brands/", brands);
app.use("/api/productTypes/", productTypes);


app.listen(port, () => {
    console.log("App listening at :" +port);
})

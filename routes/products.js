const express = require("express");
const Product = require("../models/product");
const productsRouter = express.Router();
const cors = require("cors");
const categories = require("../routes/categories");

productsRouter.use(cors());

//Get all Products
productsRouter.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    return res.send(products);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});



//Get Products By Category (t shirt, trousers..)
productsRouter.get("/bycategory/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedProduct = await Product.find({ productCategory: id });

    if (selectedProduct == null) {
      return res.status(404).send("Product Not Available!!!");
    }

    return res.status(200).send(selectedProduct);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});




//Update a Product
productsRouter.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedProduct = await Product.findById(id);

    if (selectedProduct == null) {
      return res.status(404).send("Product Not Available!!!");
    }

    selectedProduct.set({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productCategory: req.body.productCategory,
      productType: req.body.productType,
      productBrand: req.body.productBrand,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      productManufacturer: req.body.productManufacturer,
    });
    await selectedProduct.save();
    return res.status(200).send("Product Updated Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});


//Delete a Product
productsRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleteProduct = await Product.findById(id);

    if (deleteProduct == null) {
      return res.status(404).send("Product Not Available!!!");
    }

    deleteProduct.deleteOne({ _id: id });
    return res.status(200).send("Product Deleted Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

module.exports = productsRouter;

const express = require("express");
const ProductType = require("../models/productType");
const productTypesRouter = express.Router();

//Get all Brands
productTypesRouter.get("/", async (req, res) => {
    try {
      let productType = await ProductType.find();
      return res.send(productType);
    } catch (ex) {
      return res.status(500).send("Error :" + ex.Message);
    }
  });
  
  //Create a new Brand
  productTypesRouter.post("/", (req, res) => {
    try {
      if (!req.body.productType) {
        return res.status(400).send("Product Type cannot be empty!!!");
      }
  
      let newProductType = new ProductType({
        productType: req.body.productType,
      });
  
      newProductType.save();
      return res.status(200).send("Product Type saved Successfully!!");
    } catch (ex) {
      return res.status(500).send("Error :" + ex.Message);
    }
  });

  module.exports = productTypesRouter;
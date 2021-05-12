const express = require("express");
const ProductType = require("../models/productType");
const productTypesRouter = express.Router();
const cors = require("cors");

productTypesRouter.use(cors());

//Get all ProductType
productTypesRouter.get("/", async (req, res) => {
  try {
    let productType = await ProductType.find();
    return res.send(productType);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Create a new ProductType
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

//Delete a ProductType
productTypesRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let productType = await ProductType.findById(id);

    if (productType == null) {
      return res.status(404).send("ProductType Not Available!!!");
    }

    productType.deleteOne({ _id: id });
    return res.status(200).send("ProductType Deleted Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

module.exports = productTypesRouter;

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


//Update a ProductType
productTypesRouter.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let productType = await ProductType.findById(id);

    if (productType == null) {
      return res.status(404).send("Category Not Available!!!");
    }

    productType.set({
      productType: req.body.productType,
    });
    await productType.save();
    return res.status(200).send("Category Updated Successfully!!");
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

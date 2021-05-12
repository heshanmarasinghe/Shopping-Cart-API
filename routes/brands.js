const express = require("express");
const Brand = require("../models/brand");
const brandsRouter = express.Router();

//Get all Brands
brandsRouter.get("/", async (req, res) => {
  try {
    let brand = await Brand.find();
    return res.send(brand);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Create a new Brand
brandsRouter.post("/", (req, res) => {
  try {
    if (!req.body.brandName) {
      return res.status(400).send("Brand Name cannot be empty!!!");
    }

    let newBrand = new Brand({
      brandName: req.body.brandName,
    });

    newBrand.save();
    return res.status(200).send("Brand Saved Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

module.exports = brandsRouter;

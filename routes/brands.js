const express = require("express");
const Brand = require("../models/brand");
const brandsRouter = express.Router();
const cors = require("cors");

brandsRouter.use(cors());

//Get all Brands
brandsRouter.get("/", async (req, res) => {
  try {
    let brand = await Brand.find();
    return res.send(brand);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Update Brand
brandsRouter.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedBrand = await Brand.findById(id);

    if (selectedBrand == null) {
      return res.status(404).send("Brand Not Available!!!");
    }

    selectedBrand.set({
      brandName: req.body.brandName
    });
    await selectedBrand.save();
    return res.status(200).send("Brand Updated Successfully!!");
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

//Delete a Brand
brandsRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleteBrand = await Brand.findById(id);

    if (deleteBrand == null) {
      return res.status(404).send("Brand Not Available!!!");
    }

    deleteBrand.deleteOne({ _id: id });
    return res.status(200).send("Brand Deleted Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

module.exports = brandsRouter;

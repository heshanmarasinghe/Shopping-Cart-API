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

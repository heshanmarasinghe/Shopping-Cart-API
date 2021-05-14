const express = require("express");
const Manufacturer = require("../models/manufacturer");
const manufacturersRouter = express.Router();
const cors = require("cors");

manufacturersRouter.use(cors());

//get all manufacturers
manufacturersRouter.get("/", async (req, res) => {
  try {
    let manufacturer = await Manufacturer.find();
    return res.send(manufacturer);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Create manufacturer
manufacturersRouter.post("/", (req, res) => {
  try {
    if (!req.body.manufacturerName) {
      return res.status(400).send("manufacturer cannot be empty!!!");
    }

    let newManufacturer = new Manufacturer({
      manufacturerName: req.body.manufacturerName,
      country: req.body.country,
    });

    newManufacturer.save();
    return res.status(200).send("manufacturer Saved Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Update manufacturer
manufacturersRouter.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedManufacturer = await Manufacturer.findById(id);

    if (selectedManufacturer == null) {
      return res.status(404).send("Category Not Available!!!");
    }

    selectedManufacturer.set({
      manufacturerName: req.body.manufacturerName,
      country: req.body.country,
    });
    await selectedManufacturer.save();
    return res.status(200).send("Category Updated Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Delete a Manufacturer
manufacturersRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleteManufacturer = await Manufacturer.findById(id);

    if (deleteManufacturer == null) {
      return res.status(404).send("Manufacturer Not Available!!!");
    }

    deleteManufacturer.deleteOne({ _id: id });
    return res.status(200).send("Manufacturer Deleted Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

module.exports = manufacturersRouter;

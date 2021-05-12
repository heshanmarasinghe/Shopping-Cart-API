const express = require("express");
const Category = require("../models/category");
const categoriesRouter = express.Router();
const cors = require("cors");

categoriesRouter.use(cors());

//Get all categories
categoriesRouter.get("/", async (req, res) => {
  try {
    let category = await Category.find();
    return res.send(category);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Create a new category
categoriesRouter.post("/", (req, res) => {
  try {
    if (!req.body.categoryType) {
      return res.status(400).send("Category type cannot be empty!!!");
    }

    let newCategory = new Category({
      categoryType: req.body.categoryType,
    });

    newCategory.save();
    return res.status(200).send("Category Saved Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Update a Category
categoriesRouter.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedCategory = await Category.findById(id);

    if (selectedCategory == null) {
      return res.status(404).send("Category Not Available!!!");
    }

    selectedCategory.set({
      categoryType: req.body.categoryType,
    });
    await selectedCategory.save();
    return res.status(200).send("Category Updated Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Delete a Category
categoriesRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleteCategory = await Category.findById(id);

    if (deleteCategory == null) {
      return res.status(404).send("Category Not Available!!!");
    }

    deleteCategory.deleteOne({ _id: id });
    return res.status(200).send("Category Deleted Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

module.exports = categoriesRouter;

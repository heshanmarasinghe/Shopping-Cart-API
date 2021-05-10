const express = require('express');
const Category = require('../models/category');
const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    try {
        let category = await Category.find();
        return res.send(category);
    }
    catch(ex) {
        return res.status(500).send("Error :" + ex.Message);
    }
})

//Create a new category
categoriesRouter.post('/', (req, res) => {
    try {
        if(!req.body.categoryType) {
        return res.status(400)
             .send("Type cannot be empty!!!");
     }

    let newCategory = new Category({
        categoryType: req.body.categoryType
    });

        newCategory.save()
        return res.status(200).send("Category Saved Successfully!!");
    }
    catch (ex) {
        return res.status(500).send("Error :" + ex.Message);
    }
    
})
module.exports = categoriesRouter;
const express = require('express');
const Category = require('../models/category');
const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
    try {
        let category = await Category.find();
        return res.send(category);
    }
    catch(ex) {
        return res.status(500).send("Error :" + ex.Message);
    }
})

//Create a new category
categoryRouter.post('/', (req, res) => {
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
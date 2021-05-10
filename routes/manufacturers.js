const express = require('express');
const Manufacturer = require('../models/manufacturer');
const manufacturersRouter = express.Router();

manufacturersRouter.get('/', async (req, res) => {
    try {
        let manufacturer = await Manufacturer.find();
        return res.send(manufacturer);
    }
    catch(ex) {
        return res.status(500).send("Error :" + ex.Message);
    }
})

manufacturersRouter.post('/',(req, res) => {

    try {
        if(!req.body.manufacturerName) {
        return res.status(400)
             .send("manufacturer cannot be empty!!!");
     }

    let newManufacturer = new Manufacturer({
        manufacturerName: req.body.manufacturerName,
        country: req.body.country
    });

    newManufacturer.save()
        return res.status(200).send("manufacturer Saved Successfully!!");
    }
    catch (ex) {
        return res.status(500).send("Error :" + ex.Message);
    }
    

})



module.exports = manufacturersRouter;
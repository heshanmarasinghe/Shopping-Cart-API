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

module.exports = manufacturersRouter;
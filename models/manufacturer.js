const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
    manufacturerName: {
        type: String,
        required: true
    },
    country: String
    
})

const manufacturer = mongoose.model("Manufacturer", manufacturerSchema);

module.exports = manufacturer;
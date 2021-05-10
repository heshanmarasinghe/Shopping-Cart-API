const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryType: {
        type: String,
        required: true
    },
    categoryId: String,
    
})

const category = mongoose.model("Category", categorySchema);

module.exports = category;
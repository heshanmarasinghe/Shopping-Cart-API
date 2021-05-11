const mongoose = require('mongoose');

const dbConnection = async () => {
    const conn = await mongoose.connect('mongodb://localhost/ShoppingCart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to Database Successfully...!!"))
  .catch((err) => 
      console.log("Error has occured while connecting to the database :", err)
      );
};

module.exports = dbConnection;
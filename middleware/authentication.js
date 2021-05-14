const log = require("../models/log");

//Initiating a Middleware
function authentication(req, res, next) {
    console.log("Authentication Middleware Executing..........");
    console.log("Request : " +req.method+ ": " +req.url);
    saveLog(req.url,req.method)
    next();
}

function saveLog(req, method) {
    try {

      let newCategory = new log({
        request: req,
        requestMethod: method,
        createdDate: Date.now()
      });
  
      newCategory.save();
    } catch (ex) {
      return res.status(500).send("Error :" + ex.Message);
    }
  };

module.exports = authentication
//Initiating a Middleware
function authentication(req, res, next) {
    console.log("Authentication Middleware Executing..........");
    //console.log("Request : " +req.method+ ": " +req.url);
    next();
}

module.exports = authentication
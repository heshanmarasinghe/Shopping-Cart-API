const express = require("express");
const User = require("../models/user");
const usersRouter = express.Router();

//get all users
usersRouter.get("/", async (req, res) => {
  try {
    let user = await User.find();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

module.exports = usersRouter;

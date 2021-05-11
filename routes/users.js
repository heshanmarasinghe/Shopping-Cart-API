const express = require("express");
const User = require("../models/user");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";
const middleware = require("../middleware");

//login users
usersRouter.get("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        res.status(404).json({ error: "No registered user with this email" });
      else {
        bcrypt.compare(
          req.body.password,
          user.password.toString(),
          (error, match) => {
            if (error) res.status(500).json(error);
            else if (match)
              res.status(200).json({ token: generateToken(user) });
            else res.status(403).json({ error: "incorrect password" });
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

usersRouter.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      const newUser = User({
        email: req.body.email,
        role: req.body.role,
        password: hash,
      });

      var userNameArray = [];
      req.body.userName.forEach(function (item) {
        var objuserName = {
          fisrtName: item.fisrtName,
          lastName: item.lastName,
        };
        userNameArray.push(objuserName);
      });

      var userAddressArray = [];
      req.body.userAddress.forEach(function (item) {
        var objuserAddress = {
          addLine1: item.addLine1,
          addLine2: item.addLine2,
          addLine3: item.addLine3,
        };
        userAddressArray.push(objuserAddress);
      });

      newUser.userAddress = userAddressArray;
      newUser.userName = userNameArray;

      newUser
        .save()
        .then((user) => {
          res.status(200).json({ token: generateToken(user) });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    }
  });
});

usersRouter.get("/jwt-test", middleware.verify, (req, res) => {
  res.status(200).json(req.user);
});
function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

module.exports = usersRouter;

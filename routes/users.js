const express = require("express");
const User = require("../models/user");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";
const middleware = require("../middleware");
const cors = require("cors");

usersRouter.use(cors());

//login users
usersRouter.post("/login", (req, res) => {
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
            else if (match) {
              res.status(200).json({ token: generateToken(user) });
            } else res.status(403).json({ error: "Incorrect password" });
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userAddress: req.body.userAddress,
        contactNumber: req.body.contactNumber,
        password: hash,
      });

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
  return jwt.sign({ data: user.password && user.email }, tokenSecret, {
    expiresIn: "24h",
  });
}

module.exports = usersRouter;

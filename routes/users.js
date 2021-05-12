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
            else if (match)
              res.status(200).json({ token: generateToken(user) });
            else res.status(403).json({ error: "Incorrect password" });
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

usersRouter.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
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
              isActive: true,
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
      else {
        res
          .status(404)
          .json({ error: "User has already registered with this email" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

usersRouter.get("/", async (req, res) => {
  try {
    let user = await User.find();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Get One User
usersRouter.get("/userby/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedUser = await User.findById(id);

    if (selectedUser == null) {
      return res.status(404).send("User Not Available!!!");
    }

    return res.status(200).send(selectedUser);
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Update a User
usersRouter.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let selectedUser = await User.findById(id);

    if (selectedUser == null) {
      return res.status(404).send("User Not Available!!!");
    }

    selectedUser.set({
      email: req.body.email,
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userAddress: req.body.userAddress,
      contactNumber: req.body.contactNumber,
      isActive: req.body.isActive
    });
    await selectedUser.save();
    return res.status(200).send("User Updated Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
});

//Delete a user
usersRouter.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deleteUser = await User.findById(id);

    if (deleteUser == null) {
      return res.status(404).send("User Not Available!!!");
    }

    deleteUser.deleteOne({ _id: id });
    return res.status(200).send("User Deleted Successfully!!");
  } catch (ex) {
    return res.status(500).send("Error :" + ex.Message);
  }
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

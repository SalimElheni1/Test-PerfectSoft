const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
    const userObject = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      pwd: cryptedPwd,
      age: req.body.age,
    });
    userObject.save((err, result) => {
      if (err) {
        if (err.errors.email) {
          res.status(200).json({
            message: "Email exist",
          });
        }
      } else {
        res.status(200).json({
          message: "Added successfully",
          user: result,
        });
      }
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((result) => {
    if (!result) {
      res.status(200).json({
        message: "Please check Email",
      });
    } else {
      let pwdResult = bcrypt.compare(req.body.pwd, result.pwd);
      pwdResult.then((status) => {
        if (status) {
          let userToSend = {
            firstName: result.firstName,
            lastName: result.lastName,
            userId: result._id,
          };
          res.status(200).json({
            message: "Welcome",
            user: userToSend,
          });
        } else {
          res.status(200).json({
            message: "Please check Pwd",
          });
        }
      });
    }
  });
});

router.get("/", (req, res) => {
  User.find((err, docs) => {
    if (err) {
      console.log("error with DB");
    } else {
      res.status(200).json({
        users: docs,
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount == 1) {
      User.find().then((users) => {
        res.status(200).json({
          users: users,
          message: `User:id:${req.params.id} is deleted successfully`,
        });
      });
    } else {
      res.status(200).json({
        message: `User:id:${req.params.id} not found`,
      });
    }
  });
});

router.get("/:name", (req, res) => {
  User.find({ name: req.params.name }).then((result) => {
    console.log("here into search", result);
    // if (result.deletedCount == 1) {
    // User.find().then((users) => {
    //   res.status(200).json({
    //     users: users,
    //     //message: `User:id:${req.params.id} is deleted successfully`,
    //   });
    // });
    // } else {
    //   res.status(200).json({
    //     message: `User:id:${req.params.id} not found`,
    //   });
    // }
  });
});
//Rend router exportable
module.exports = router;

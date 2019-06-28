const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.post("/", (req, res, next) => {
  console.log("Hit the post route for User...");
  const user = new User(req.body);
  user.save((err, newUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(newUser);
  });
});

userRouter.get("/:userId", (req, res, next) => {
  const user = req.params.userId;
  User.findOne({ _id: user }, (err, result) => {
    if (err) {
      res.status(500);
      return next(err);
    } else if (!result) {
      res.status(404);
      return next(new Error("No user found."));
    }
    return res.send(result);
  });
});

userRouter.put("/:userId", (req, res, next) => {
  console.log("Hit the user put route...");
  User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { new: true },
    (err, result) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      return res.send(result);
    }
  );
});

module.exports = userRouter;

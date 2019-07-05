const express = require("express");
const adminRouter = express.Router();
// const Participant = require("../models/participant");
// const User = require("../models/user");
const Pair = require("../models/pair");
// 2. algorithm to match - tasks

adminRouter.get("/participants", (req, res, next) => {
  console.log(`Hit the base route for Participants...`);
  // 1. get the participants that have clicked in as ready - based on email - get only today date
  let participants = [];
  User.find((err, users) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    console.log(users);
    participants = users.filter(user => {
      return (
        user.preferences[user.preferences.length - 1].date.toDateString() ===
        new Date().toDateString()
      );
    });
    return participants.length > 0
      ? res.send(participants)
      : res.status(404).send([]);
  });
});

adminRouter.post("/pairs", (req, res, next) => {
  const todo = new Pair(req.body);
  todo.user = req.user._id;
  todo.save(function(err, newTodo) {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(newTodo);
  });
});

module.exports = adminRouter;

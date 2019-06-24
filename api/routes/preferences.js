const express = require("express");
const preferencesRouter = express.Router();
const TaskPreferences = require("../models/taskPreferences");

preferencesRouter.post("/", (req, res, next) => {
  console.log("Hit the post preferences route...");
  const preferences = new TaskPreferences(req.body);
  preferences.save((err, result) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(result);
  });
});

preferencesRouter.get("/:id", (req, res, next) => {
  console.log("Hit the get_one preferences route...");
  TaskPreferences.findById(req.params.id, (err, response) => {
    if (err) {
      res.status(500);
      return next(err);
    } else if (!response) {
      res.status(404);
      return next(
        new Error(`Cannot find preferences for id = ${req.params.id}`)
      );
    }
    return res.send(response);
  });
});
module.exports = preferencesRouter;

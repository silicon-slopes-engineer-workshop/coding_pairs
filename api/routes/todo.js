const express = require("express");
const todoRouter = express.Router();
const Todo = require("../models/todo");
const User = require("../models/user");

todoRouter.get("/", (req, res, next) => {
  console.log(`Hit the base route for User...`);
  User.find((err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.send(user);
  });
});

todoRouter.post("/", (req, res, next) => {
  const todo = new Todo(req.body);
  todo.user = req.user._id;
  todo.save(function(err, newTodo) {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(newTodo);
  });
});

todoRouter.get("/:todoId", (req, res, next) => {
  const user = req.params.todoId;
  console.log(user);
  User.findOne({ _id: user }, (err, todo) => {
    if (err) {
      res.status(500);
      return next(err);
    } else if (!todo) {
      res.status(404);
      return next(new Error("No todo item found."));
    }
    return res.send(todo);
  });
});

todoRouter.put("/:todoId", (req, res, next) => {
  Todo.findOneAndUpdate(
    { _id: req.params.todoId, user: req.user._id },
    req.body,
    { new: true },
    (err, todo) => {
      if (err) {
        console.log("Error");
        res.status(500);
        return next(err);
      }
      return res.send(todo);
    }
  );
});

todoRouter.delete("/:todoId", (req, res, next) => {
  Todo.findOneAndRemove(
    { _id: req.params.todoId, user: req.user._id },
    (err, todo) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.send(todo);
    }
  );
});

module.exports = todoRouter;

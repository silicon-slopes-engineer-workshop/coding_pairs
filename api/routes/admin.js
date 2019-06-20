const express = require("express");
const adminRouter = express.Router();
// const Participant = require("../models/participant");
// const User = require("../models/user");

// 2. algorithm to match - tasks 

adminRouter.get("/participants", (req, res, next) => {
    console.log(`Hit the base route for Participants...`);
  // 1. get the participants that have clicked in as ready - based on email - get only today date
    // Participant.find((err, user) => {
    //   if (err) {
    //     res.status(500);
    //     return next(err);
    //   }
    //   return res.send(user);
    // });
    return res.send([{
        username: "a@b.c",
        id: 1
    }, {
        username: "d@e.f",
        id:2
    },{
        username: "dfsadd@asdfe.sdff",
        id:3
    }]);
  });
  
//   adminRouter.post("/", (req, res, next) => {
//     const todo = new Todo(req.body);
//     todo.user = req.user._id;
//     todo.save(function(err, newTodo) {
//       if (err) {
//         res.status(500);
//         return next(err);
//       }
//       return res.status(201).send(newTodo);
//     });
//   });

module.exports = adminRouter;
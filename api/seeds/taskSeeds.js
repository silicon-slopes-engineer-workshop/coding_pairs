const mongoose = require("mongoose");
const db = mongoose.connection;
const Task = require("../models/task");
const taskData = require("./taskData");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/codewithme";

mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true });
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log(`Connected successfully to mongo db at ${MONGODB_URI}`);
  taskData.forEach(item => {
    let task = new Task({ ...item });
    task.save((err, result) => {
      if (err) console.log(err);
      console.log(
        `${result.title} saved to the database with id = ${result._id}`
      );
    });
  });
});

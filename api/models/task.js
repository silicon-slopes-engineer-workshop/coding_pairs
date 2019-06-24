const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ideas: {
    type: [String],
    required: true
  },
  imageURL: {
    type: String
  }
});

module.exports = mongoose.model("Task", taskSchema);

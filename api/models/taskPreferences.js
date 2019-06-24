const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskPreferences = new Schema({
  date: {
    type: Date,
    required: true
  },
  preferences: {
    type: [Schema.Types.ObjectId],
    required: true
  }
});

module.exports = mongoose.model("TaskPreferences", taskPreferences);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  participants: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  task: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("Event", eventSchema);

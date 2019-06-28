const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
});

module.exports = mongoose.model("Participant", participantSchema);

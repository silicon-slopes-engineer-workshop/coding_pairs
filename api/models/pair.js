const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// not done yet - finish with algorithm
const pairSchema = new Schema({
    accepted: {
        type: Boolean,
        default: false
    },
    userA: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userB: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userC: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
});

module.exports = mongoose.model("Pair", pairSchema);
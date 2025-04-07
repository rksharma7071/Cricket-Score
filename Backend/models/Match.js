// models/Match.js
const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  date: { type: Date, default: Date.now },
  location: String,
  result: String, // You can expand this later: "Team A won", etc.
});

module.exports = mongoose.model("Match", matchSchema);

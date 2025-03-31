const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  runs: { type: Number, required: true, default: 0 },
  wickets: { type: Number, required: true, default: 0 },
  overs: { type: Number, required: true, default: 0 },
  balls: { type: Number, required: true, default: 0 },
  currentOver: { type: [String], default: [] }, // List of events in the current over
  completedOvers: [{
    runs: Number,
    wickets: Number,
    over: [String], // List of events in the completed over
  }],
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;

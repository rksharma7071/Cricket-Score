const mongoose = require('mongoose');

const completedOverSchema = new mongoose.Schema({
  runs: { type: Number, required: true },
  wickets: { type: Number, required: true },
  over: { type: [String], required: true }
}, { _id: false });

const scoreSchema = new mongoose.Schema({
  runs: { type: Number, required: true, default: 0 },
  wickets: { type: Number, required: true, default: 0 },
  overs: { type: Number, required: true, default: 0 },
  balls: { type: Number, required: true, default: 0 },
  currentOver: { type: [String], default: [] },
  completedOvers: { type: [completedOverSchema], default: [] },

  // NEW fields
  striker: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  nonStriker: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  lastRun: { type: Number, default: 0 }
}, { timestamps: true });

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;

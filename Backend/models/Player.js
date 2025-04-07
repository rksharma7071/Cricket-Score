const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'], required: true },
  age: Number,
  jerseyNumber: Number,
  battingStyle: String,
  bowlingStyle: String,

  // Batting stats
  totalRuns: { type: Number, default: 0 },
  totalFours: { type: Number, default: 0 },
  totalSixes: { type: Number, default: 0 },

  // Bowling stats
  totalBallsBowled: { type: Number, default: 0 },
  dotBalls: { type: Number, default: 0 },
  wicketsTaken: { type: Number, default: 0 }

}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);

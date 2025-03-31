const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  battingAverage: { type: Number, required: true },
  bowlingStyle: { type: String, required: true },
  team: { type: String, required: true }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;

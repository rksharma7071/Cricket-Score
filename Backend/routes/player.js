const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

router.route('/')
  .post(async (req, res) => {
    try {
      const player = new Player(req.body);
      await player.save();
      res.status(201).json(player);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .get(async (req, res) => {
    try {
      const players = await Player.find();
      res.json(players);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    try {
      const player = await Player.findById(req.params.id);
      if (!player) return res.status(404).json({ error: 'Player not found' });
      res.json(player);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedPlayer = await Player.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedPlayer) return res.status(404).json({ error: 'Player not found' });
      res.json(updatedPlayer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
      if (!deletedPlayer) return res.status(404).json({ error: 'Player not found' });
      res.json({ message: 'Player deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


router.put('/:id/updateStats', async (req, res) => {
  const { runs = 0, fours = 0, sixes = 0 } = req.body;

  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ error: 'Player not found' });

    player.runs += runs;
    player.fours += fours;
    player.sixes += sixes;

    await player.save();
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const Score = require('../models/Score');
const router = express.Router();

// POST /score - Add or update the score
router.post('/', async (req, res) => {
  try {
    const {
      runs,
      wickets,
      overs,
      balls,
      currentOver,
      completedOvers,
      striker,
      nonStriker,
      lastRun
    } = req.body;

    let score = await Score.findOne();
    if (!score) {
      score = new Score();
    }

    score.runs = runs;
    score.wickets = wickets;
    score.overs = overs;
    score.balls = balls;
    score.currentOver = currentOver;
    score.completedOvers = completedOvers;

    // New fields
    score.striker = striker;
    score.nonStriker = nonStriker;
    score.lastRun = lastRun;

    // Change strike if lastRun is odd
    if (lastRun % 2 === 1) {
      const temp = score.striker;
      score.striker = score.nonStriker;
      score.nonStriker = temp;
    }

    await score.save();
    res.status(200).json(score);
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ error: 'Error updating score' });
  }
});

// GET /score - Retrieve the current score
router.get('/', async (req, res) => {
  try {
    console.log('GET /score received');
    const score = await Score.findOne()
      .populate('striker', 'name')       // Only fetch player name
      .populate('nonStriker', 'name');

    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }

    res.status(200).json(score);
  } catch (error) {
    console.error('Error fetching score:', error);
    res.status(500).json({ error: 'Error fetching score' });
  }
});

module.exports = router;

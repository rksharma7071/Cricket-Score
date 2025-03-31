const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Score = require('./models/Score');

// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const uri = 'mongodb+srv://rksharma7071:hvbxL3hsoqcdI1P5@cluster0.4qodhui.mongodb.net/cricketScoreDB?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


  app.get('/score', async (req, res) => {
    try {
      const score = await Score.findOne();
      if (!score) {
        return res.status(404).json({ message: 'Score not found' });
      }
      res.status(200).json(score);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching score' });
    }
  });
// In your backend code, make sure to log what comes through the request
app.get('/score', async (req, res) => {
  try {
    console.log('GET /score received'); // Add logging for debugging
    const score = await Score.findOne();
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }
    res.status(200).json(score);
  } catch (error) {
    console.error('Error fetching score:', error); // Log any errors
    res.status(500).json({ error: 'Error fetching score' });
  }
});

app.post('/add-run', async (req, res) => {
  try {
    const { runs } = req.body;

    const score = await Score.findOne();
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }

    // Update score
    score.runs += runs;
    score.balls += 1;
    score.currentOver.push(runs.toString());

    // Handle completed over
    if (score.balls === 6) {
      score.overs += 1;
      score.completedOvers.push({
        runs: score.runs,
        wickets: score.wickets,
        over: score.currentOver,
      });
      score.balls = 0;
      score.currentOver = [];
    }

    await score.save();
    res.status(200).json(score);
  } catch (error) {
    res.status(500).json({ error: 'Error adding run' });
  }
});
app.post('/add-wicket', async (req, res) => {
  try {
    const score = await Score.findOne();
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }

    score.wickets += 1;
    score.balls += 1;
    score.currentOver.push('W');

    // Handle completed over
    if (score.balls === 6) {
      score.overs += 1;
      score.completedOvers.push({
        runs: score.runs,
        wickets: score.wickets,
        over: score.currentOver,
      });
      score.balls = 0;
      score.currentOver = [];
    }

    await score.save();
    res.status(200).json(score);
  } catch (error) {
    res.status(500).json({ error: 'Error adding wicket' });
  }
});
app.post('/add-extra', async (req, res) => {
  try {
    const { type, runs } = req.body;
    const score = await Score.findOne();
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }

    score.runs += runs;
    score.balls += 1;
    score.currentOver.push(`${type}(${runs})`);

    // Handle completed over
    if (score.balls === 6) {
      score.overs += 1;
      score.completedOvers.push({
        runs: score.runs,
        wickets: score.wickets,
        over: score.currentOver,
      });
      score.balls = 0;
      score.currentOver = [];
    }

    await score.save();
    res.status(200).json(score);
  } catch (error) {
    res.status(500).json({ error: 'Error adding extra' });
  }
});
app.post('/reset-score', async (req, res) => {
  try {
    await Score.deleteMany(); // Delete existing score
    const newScore = new Score({
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      currentOver: [],
      completedOvers: [],
    });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset score' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

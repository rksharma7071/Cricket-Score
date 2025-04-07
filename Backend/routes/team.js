const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.route('/')
  .post(async (req, res) => {
    try {
      const team = new Team(req.body);
      await team.save();
      res.status(201).json(team);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .get(async (req, res) => {
    try {
      const teams = await Team.find().populate('players');
      res.json(teams);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    try {
      const team = await Team.findById(req.params.id).populate('players');
      if (!team) return res.status(404).json({ error: 'Team not found' });
      res.json(team);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const updatedTeam = await Team.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedTeam) return res.status(404).json({ error: 'Team not found' });
      res.json(updatedTeam);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedTeam = await Team.findByIdAndDelete(req.params.id);
      if (!deletedTeam) return res.status(404).json({ error: 'Team not found' });
      res.json({ message: 'Team deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;

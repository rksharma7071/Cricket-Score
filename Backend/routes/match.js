// routes/match.js
const express = require("express");
const router = express.Router();
const Match = require("../models/Match");

// Create a match
router.post("/", async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("teamA")
      .populate("teamB");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single match by ID
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("teamA")
      .populate("teamB");
    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a match
router.put("/:id", async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("teamA")
      .populate("teamB");

    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a match
router.delete("/:id", async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json({ message: "Match deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

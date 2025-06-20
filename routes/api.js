const express = require("express");
const router = express.Router();
const Question = require("../models/question");

router.get("/questions", async (req, res) => {
  const { category = "programming", limit = 10 } = req.query;

  // Optional: validate inputs
  const allowedCategories = ["programming", "mathematics", "geography", "entertainment"];
  if (!allowedCategories.includes(category.toLowerCase())) {
    return res.status(400).json({ error: "Invalid category" });
  }

  const safeLimit = Math.min(Number(limit), 25);

  try {
    const questions = await Question.aggregate([
      { $match: { category: category.toLowerCase() } },
      { $sample: { size: safeLimit } }
    ]);
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

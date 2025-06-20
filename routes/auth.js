// routes/auth.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user"); // Mongoose User model

// Register Route

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
   

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Try again." });
  }
});




// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: "Invalid email or password." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ error: "Invalid email or password." });
  }

  res.status(200).send({ message: "Login successful!" });
});

module.exports = router;

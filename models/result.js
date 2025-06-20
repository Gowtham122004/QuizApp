const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  email:    { type: String, required: true },
  score:    { type: Number, required: true },
  total:    { type: Number, required: true },
  category: { type: String, required: true },
  date:     { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", ResultSchema);

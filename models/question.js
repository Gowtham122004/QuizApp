const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  category:       { type: String, required: true },
  question:       { type: String, required: true },
  options:        { type: [String], required: true },
  correctAnswer:  { type: Number, required: true }
});

module.exports = mongoose.model("Question", QuestionSchema); 

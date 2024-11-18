const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: Number, required: true },
  difficulty: { type: Number, default: 1 }, 
  topic: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: [QuestionSchema],
  score: { type: Number, default: 0 },
  completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", QuizSchema);

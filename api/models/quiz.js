const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
  quizId: {
    type: String,
    require: true,
    unique: true,
  },
  testId: {
    type: String,
    require: true,
    ref:'Test'
  },
  quizType: {
    type: String,
    require: false,
    ref:'TypeQuiz'
  },
  question: {
    type: String,
    require: true,
  },
  choice: {
    type: String,
    require: true,
  },
  result: {
    type: String,
    require: true,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
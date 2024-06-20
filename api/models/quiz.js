const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
  testId: {
    type: String,
    require: true,
    ref:'Test'
  },
  quizType: {
    type: Number,
    require: false,
    ref:'TypeQuiz'
  },
  question: {
    type: String,
    require: true,
  },
  choice: [
    {
      type: String,
      require: true,
    },
  ],
    
  result: {
    type: String,
    require: true,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
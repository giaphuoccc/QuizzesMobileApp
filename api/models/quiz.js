const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
  testId:
  {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Test',
  },

  quizType:
  {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'TypeQuiz',
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

  result: [
      {
      type: String,
      require: true,
    },
  ]
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Quiz = require('../models/quiz')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/created', (req, res) => {
  const { testId, quizType, question, choice, result } = req.body;
  const newQuiz = new Quiz({ testId, quizType, question, choice, result });
  newQuiz
    .save()
    .then(() => {
      res.status(200).json({ message: 'Quiz registered successfully!' });
    })
    .catch(err => {
      console.log('Error registering !!!', err);
      res.status(400).json({ message: 'Error registered' });
    });
});

app.get('/getQuiz', (req, res) => {
  Quiz.find()
    .then(quiz => {
      res.status(200).json(quiz);
    })
    .catch(err => {
      console.log('Error retrieving', err);
      res.status(500).json({ message: 'Error retrieving' });
    });
});

module.exports = app;
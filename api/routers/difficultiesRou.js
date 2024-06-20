const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Chapter = require('../models/difficulties');
const Difficulties = require('../models/difficulties');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.post('/created', (req, res) => {
  const {diffcultyLevel} = req.body;
  const newUser = new Chapter({diffcultyLevel});
  newUser
    .save()
    .then(() => {
      res.status(200).json({message: 'Chapter registered successfully!'});
    })
    .catch(err => {
      console.log('Error registering user!!!', err);

      res.status(400).json({message: 'Error registered the user!'});
    });
});
app.get('/getdiff', (req, res) => {
  Difficulties.find({}, 'diffcultyLevel')
    .then(diff => {
      res.status(200).json(diff);
    })
    .catch(err => {
      console.log('Error retrieving user', err);
      res.status(500).json({message: 'Error retrieving user'});
    });
});

module.exports = app;

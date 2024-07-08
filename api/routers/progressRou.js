const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Progress = require('../models/progress')
const User = require('../models/user')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.post('/created', (req, res) => {
    const {userId,testId,status,point} = req.body;
    const newProgress = new Progress({userId,testId,status,point});
    newProgress
      .save()
      .then(() => {
        res.status(200).json({message: 'Progress registered successfully!'});
      })
      .catch(err => {
        console.log('Error registering !!!', err);
        res.status(400).json({message: 'Error registered'});
      });
  });
  app.get('/getProgress', (req, res) => {
    Progress.find()
      .then(progress => {
        res.status(200).json(progress);
      })
      .catch(err => {
        console.log('Error retrieving', err);
        res.status(500).json({message: 'Error retrieving'});
      });
  });

module.exports = app;
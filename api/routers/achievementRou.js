const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Achievement = require('../models/achievement');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.post('/created', (req, res) => {
    const {achievementName,achievementStatus} = req.body;
    const newAchievement = new Achievement({achievementName,achievementStatus});
    newAchievement
      .save()
      .then(() => {
        res.status(200).json({message: 'Achievement registered successfully!'});
      })
      .catch(err => {
        console.log('Error registering !!!', err);
        res.status(400).json({message: 'Error registered'});
      });
  });
  app.get('/getAchievement', (req, res) => {
    Achievement.find()
      .then(achievement => {
        res.status(200).json(achievement);
      })
      .catch(err => {
        console.log('Error retrieving', err);
        res.status(500).json({message: 'Error retrieving'});
      });
  });
module.exports = app;
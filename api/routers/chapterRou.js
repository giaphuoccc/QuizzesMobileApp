const express = require("express");
const Chapter = require("../models/chapter")
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/createchapter', (req, res) => {
    const {chapterName, chapterDescription, chapterDifficulties} = req.body;
    const newUser = new Chapter({chapterName, chapterDescription, chapterDifficulties});
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

module.exports = app;
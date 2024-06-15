const express = require("express");
const User = require('../models/user');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

const {create} = require('react-test-renderer');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/register', (req, res) => {
  const {name, email, password, image} = req.body;
  const newUser = new User({name, email, password, image});
  newUser
    .save()
    .then(() => {
      res.status(200).json({message: 'User registered successfully!'});
    })
    .catch(err => {
      console.log('Error registering user!!!', err);
      res.status(400).json({message: 'Error registered the user!'});
    });
});

module.exports = app;
const express = require("express");
const mongoose = require('mongoose');
const User = require('../models/user');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
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
const createToken = userId => {
  const payload = {
    userId: userId,
  };
  const token = jwt.sign(payload, 'Q$r2K6W8n!jCW%Zk', {expiresIn: '30s'});
  return token;
};

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({message: 'Email and the password are required'});
  }

  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
      if (user.password !== password) {
        return res.status(404).json({message: 'Invalid Password'});
      }
      const token = createToken(user._id);
      res.status(200).json({token});
    })
    .catch(err => {
      console.log('Error in finding the user', err);
      res.status(500).json({message: 'Internal server Error!'});
    });
});

app.post('/verifyToken', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }
  jwt.verify(token, 'Q$r2K6W8n!jCW%Zk', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    res.status(200).json({ message: 'Token is valid' });
  });
});

//findOnebyID
// app.get("/:userId", (req, res) => {
//   const userId = req.params.userId; // Lấy userId từ request params
//   User.findById(userId) // Tìm người dùng bằng ID
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({message: "User not found"});
//       }
//       res.status(200).json(user); // Trả về thông tin của người dùng
//     })
//     .catch(err => {
//       console.log("Error retrieving user", err);
//       res.status(500).json({message: "Error retrieving user"});
//     });
// });

//findall
app.get('/:userId', (req, res) => {
  const loggedInUserId = req.params.userId;
  User.find({_id: {$ne: loggedInUserId}})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log('Error retrieving users', err);
      res.status(500).json({message: 'Error retrieving users'});
    });
});

//get user data

module.exports = app;
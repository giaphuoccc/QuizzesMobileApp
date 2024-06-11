const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const app = express();
const port = 8000;
const cors = require('cors');

// const {create} = require('react-test-renderer');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose
  .connect(
    'mongodb+srv://nguyentrunghau220203:hau220203@cluster0.yywfbel.mongodb.net/',
    {
    // Các tùy chọn nếu cần thiết
      // useNewUrlParser: true,
      // useUnifiedTopology: true
      
    },
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });

app.listen(port, () => {
  console.log('Sever running on port 8000 ');
});
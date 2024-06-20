const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Test = require('../models/test')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/created', (req, res) => {
    const { testName, chapterId,status,point } = req.body;
    const newTest= new Test({ testName, chapterId,status,point  });
    newTest
        .save()
        .then(() => {
            res.status(200).json({ message: 'newTest registered successfully!' });
        })
        .catch(err => {
            console.log('Error registering !!!', err);
            res.status(400).json({ message: 'Error registered' });
        });
});
app.get('/getTest', (req, res) => {
    Test.find()
        .then(test => {
            res.status(200).json(test);
        })
        .catch(err => {
            console.log('Error retrieving', err);
            res.status(500).json({ message: 'Error retrieving' });
        });
});

module.exports = app;
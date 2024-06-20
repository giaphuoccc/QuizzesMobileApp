const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const TypeQuiz = require('../models/typeQuiz')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/created', (req, res) => {
    const { typeName, typeDescription } = req.body;
    const newTypeQuiz = new TypeQuiz({ typeName, typeDescription  });
    newTypeQuiz
        .save()
        .then(() => {
            res.status(200).json({ message: 'newTypeQuiz registered successfully!' });
        })
        .catch(err => {
            console.log('Error registering !!!', err);
            res.status(400).json({ message: 'Error registered' });
        });
});
app.get('/getTypeQuiz', (req, res) => {
    TypeQuiz.find()
        .then(typeQuiz => {
            res.status(200).json(typeQuiz);
        })
        .catch(err => {
            console.log('Error retrieving', err);
            res.status(500).json({ message: 'Error retrieving' });
        });
});

module.exports = app;
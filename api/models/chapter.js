const mongoose = require('mongoose');
const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    ref: 'User',
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Chapter = mongoose.model('chapter', chapterSchema);
module.exports = Chapter;

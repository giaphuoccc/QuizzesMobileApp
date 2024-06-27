const mongoose = require('mongoose');
const chapterSchema = new mongoose.Schema({
  chapterName: {
    type: String,
    require: true,
  },
  chapterDescription: {
    type: String,
    require: false,
  },
  chapterDifficulties:{
    type: String,
    require: false,
  },
});

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;

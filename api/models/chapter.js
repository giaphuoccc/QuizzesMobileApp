const mongoose = require('mongoose');
const ChapterSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  });
  
  const Chapter = mongoose.model('chapter', ChapterSchema);
  module.exports = Chapter;

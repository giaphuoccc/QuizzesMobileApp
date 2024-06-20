const mongoose = require('mongoose');
const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    ref:'User'
  },
  chapterId: {
    type: String,
    require: true,
    ref:'Chapter'
  },
  testId: {
    type: String,
    require: true,
    ref:'Test'
  },
  status: {
    type: String,
    require: true,
  },
});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
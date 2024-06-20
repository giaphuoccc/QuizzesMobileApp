const mongoose = require('mongoose');
const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    ref:'User'
  },
  testId: {
    type: String,
    require: true,
    ref:'Test'
  },
});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
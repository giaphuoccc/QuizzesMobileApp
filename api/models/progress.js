const mongoose = require('mongoose');
const progressSchema = new mongoose.Schema({
  userId:
  {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
  },
  testId:
  {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Test',
  },

});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
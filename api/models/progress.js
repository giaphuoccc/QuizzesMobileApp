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
  status: {
    type: Number,
    require: true,
  },
  point: {
    type: Number,
    require: true,
  },

});

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;
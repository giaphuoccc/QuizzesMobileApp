const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    require: true,
  },
  chapterId:
  {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Chapter',
  },


});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
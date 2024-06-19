const mongoose = require('mongoose');
const typeQuizSchema = new mongoose.Schema({
  typeId: {
    type: String,
    require: true,
    unique: true,
  },
  typeName: {
    type: String,
    require: true,
  },
  typeDiscription: {
    type: String,
    require: true,
  },
});

const TypeQuiz = mongoose.model('TypeQuiz', typeQuizSchema);
module.exports = TypeQuiz;
const mongoose = require('mongoose');
const difficultiesSchema = new mongoose.Schema({
    difficultyId: {
    type: String,
    require: true,
    unique: true,
  },
  diffcultyLevel: {
    type: String,
    require: true,
  },
});

const Difficulties = mongoose.model('Difficulties', difficultiesSchema);
module.exports = Difficulties;

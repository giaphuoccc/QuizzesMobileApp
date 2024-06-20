const mongoose = require('mongoose');
const difficultiesSchema = new mongoose.Schema({
  diffcultyLevel: {
    type: String,
    require: true,
  },
});

const Difficulties = mongoose.model('Difficulties', difficultiesSchema);
module.exports = Difficulties;

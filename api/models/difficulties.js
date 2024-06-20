const mongoose = require('mongoose');
const difficultiesSchema = new mongoose.Schema({
  diffcultyLevel: {
    type: String,
    require: true,
  },
});

const Difficulties = mongoose.model('difficulties', difficultiesSchema);
module.exports = Difficulties;

const mongoose = require('mongoose');
const achievementSchema = new mongoose.Schema({
  achievementName: {
    type: String,
    require: true,
  },
  achievementStatus: {
    type: Number,
    require: true,
  },
});

const Achievement = mongoose.model('Achievement', achievementSchema);
module.exports = Achievement;
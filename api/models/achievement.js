const mongoose = require('mongoose');
const achievementSchema = new mongoose.Schema({
  achievementId: {
    type: String,
    require: true,
    unique: true,
  },
  achievementName: {
    type: String,
    require: true,
  },
  achievementStatus: {
    type: String,
    require: true,
  },
});

const Achievement = mongoose.model('Achievement', achievementSchema);
module.exports = Achievement;
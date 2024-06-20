const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
testName:{
    type:String,
    require: true,
},
chapterId:{
    type:String,
    require: true,
    ref: 'Chapter',
},
status:{
    type:Number,
    require: true,
},
point:{
    type:Number,
    require: true,
},

});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
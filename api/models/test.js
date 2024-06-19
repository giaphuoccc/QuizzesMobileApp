const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
testId:{
    type:String,
    require: true,
    unique: true,
},
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
    type:String,
    require: true,
    unique: true,
},
point:{
    type:Number,
    require: true,
    unique: true,
},

});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
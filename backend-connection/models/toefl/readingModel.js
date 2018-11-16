
var mongoose = require('mongoose');

var readingSchema = new mongoose.Schema({
    toeflNo: {type: Number, required: true},                                       //시험출제 회차
    readingCreatedDate:{type:Date, 'default':Date.now},                      //시험출제 생성일자
    section1Title:{type: String, trim:true, 'default':''},
    section1Script:{type:String, trim:true, 'default':''},
    section1Problems:[{ type: mongoose.Schema.ObjectId, ref: 'readingProblem'}],
    section2Title:{type: String, trim:true, 'default':''},
    section2Script:{type:String, trim:true, 'default':''},
    section2Problems:[{ type: mongoose.Schema.ObjectId, ref: 'readingProblem'}],
    section3Title:{type: String, trim:true, 'default':''},
    section3Script:{type:String, trim:true, 'default':''},
    section3Problems:[{ type: mongoose.Schema.ObjectId, ref: 'readingProblem'}],
    section4Title:{type: String, trim:true, 'default':''},
    section4Script:{type:String, trim:true, 'default':''},
    section4Problems:[{ type: mongoose.Schema.ObjectId, ref: 'readingProblem'}],
});

module.exports = mongoose.model('Reading', readingSchema);

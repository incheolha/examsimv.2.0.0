
var mongoose = require('mongoose');

var writingSchema = new mongoose.Schema({

    ExamNO: {type: Number, required: true},                     //시험출제 횟차    
    ExamDesc:{type: String},                                    //시험출제 간단 설명
    ExamCreatedTime:{type: Date, 'default': Date.now}, 
    toeflNo: {type: mongoose.Schema.ObjectId, ref:'Toefl'},     // MAIL TOEFL Doc에 연결    
    Problem:[{     
        writingProblemType : {type: Number} ,                   // 독립형인지, 통합형인지 구분  1:통합형 2:독립형
        writingAnnounceDirection: {type: String},               // 문제출제전 나오는 direction db에서 읽어오기
        writingAnnouncementAudio: {type: String},               // 디렉션 읽어주는 audio db에서 읽어오기
        writingProblem: {type: String},                         //문제 출제 파트. db에서 읽어오기만 한다.
        writingProblemReading: {type: String},                  //ck editor. 문제에 관련된 스크립트.
        writingProblemListeningImage: {type: String},           //문제에 관련된 lecture image
        writingProblemListeningAudio: {type: String},           //문제관련 lecture mp3
        writingProblemAnswer: {type: String}                    //선생님이 달아주는 해설파트.
        }]
});

module.exports = mongoose.model('Writing', speakingSchema);

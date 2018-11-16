
var mongoose = require('mongoose');

var speakingSchema = new mongoose.Schema({
    	    
    ExamNO: {type: Number, unique: true},                       //시험출제 횟차    -시험응시collection과 연결필요
    ExamDesc:{type: String},                                    //시험출제 간단 설명
    ExamCreatedTime:{type: Date, 'default': Date.now},          //시험출제 생성일자
    toeflNo: {type: mongoose.Schema.ObjectId, ref:'Toefl'},     // MAIL TOEFL Doc에 연결
    Problem: [{  
        speakingProblemType: {type: Number},   
        speakingAnnounceImage: {type: String},                  // 아나운서 이미지 --- 이미지파일 이름
        speakingAnnouncementAudio: {type: String},              // 아나운서 멘트  ------ audio 파일이름
        speakingProblem: {type: String},                        // 시험  4번문제
        speakingProblemReading: {type: String},                 //  시험 4번문제 지문
        speakingProblemListeningImage: {type: String},          //  시험 4번문제 듣기에 삽입할 이미지
        speakingProblemListeningAudio: {type: String},          //  시험 4번문제 듣기
        speakingProblemAnswer: {type: String}                   //  시험 4번문제 표준정답 audio파일
                
    }]                               
});

module.exports = mongoose.model('Speaking', speakingSchema);

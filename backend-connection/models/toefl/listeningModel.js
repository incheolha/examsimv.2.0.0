const mongoose = require('mongoose');

// 스피킹 스키마 정의
var listeningSchema = mongoose.Schema({
    ExamNO: {type: Number, trim:true, unique:true, 'default':''},
    ExamDesc:{type: String, trim:true, 'default':''},        //시험출제 간단 설명
    ExamCreatedTime:{type: Date, 'default': Date.now},
    toeflNo: {type: mongoose.Schema.ObjectId, ref:'Toefl'},
    listeningParagraph :[{
        listeningChapterNumber:{type:Number},
        listeningChapterAudio:{type: String, trim:true, 'default':''},
        listeningChapterImage:{type: String, trim:true, 'default':''},
        Problem: [{
            listeningProblemType: { type: Number },                                   // 1~7번 까지의 유형
            listeningAnnouncementText1: {type: String, trim:true, 'default':''},
            listeningAnnouncementAudio1: {type: String, trim:true, 'default': ''},     //나레이터  멘트  ------ audio 파일이름
            listeningAnnouncementAudio2: {type: String, trim:true, 'default': ''},     // 나레이터  멘트 2 ----- 2개가 필요한 문제의 경우 사용
            listeningProblemAudio1 : {type: String, trim:true, 'default':''},		       //강의내용 or 대화내용 -- audio 파일 이름
            listeningProblemAudio2: {type: String, trim:true, 'default':''},          //강의내용 or 대화내용 2 -- audio 파일 2개가 필요한 경우사용
            listeningProblemImage:{type: String, trim: true, 'default':''},		        //강의 or 대화 이미지 -- image 파일 이름
            listeningProblem: {type:String, trim:true, 'default': ''},                // 시험 1번문제
            listeningProblemArticle1 : {type:String, trim:true, 'default':''},         // question 1
            listeningProblemArticle2 : {type:String, trim:true, 'default':''},         // question 2
            listeningProblemArticle3 : {type:String, trim:true, 'default':''},         // question 3
            listeningProblemArticle4 : {type:String, trim:true, 'default':''},         // question 4
            listeningProblemArticle5 : {type:String, trim:true, 'default':''},
            listeningProblemArticle6 : {type:String, trim:true, 'default':''},
            listeningProblemAnswer:{type:String, trim:true, 'default':''},		  // 정답
            listeningProblemComment:{type:String, trim:true, 'default':''}		  // 해설
        }]

    }]
});
module.exports = mongoose.model('Listening', listeningSchema);

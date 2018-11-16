
const mongoose = require('mongoose');

const readingProblemSchema = new mongoose.Schema({
 
    sectionNo: {type: number},                                               //section no
    readingId: { type: mongoose.Schema.ObjectId, ref:'Reading' },            // reading ID
    readingParagraphTitle:{type: String, trim:true, 'default':''},           //지문의 제목
    readingParagraphScript:{type:String, trim:true, 'default':''},           // 각 지문별 scripts
    readingParagraphGlossary:{type:String, trim:true, 'default':''},         //어려운 단어 설명
    readingParagrphImage: {type: String, trim: true, 'default':''},          //지문 관련 이미지
    readingProblemType:{type:Number, trim:true, 'default':''},               //문제유형

    question1:{type:String, trim:true, 'default':''},                        // 시험문제
    subQuestion1:{type:String, trim:true, 'default':''},                     // 7,8번 유형 문제
    subQuestion2:{type:String, trim:true, 'default':''},                     // 8번시혐유형 문제
    
    article1:{type:String, trim:true, 'default':''},                         // 문제 a번
    article2:{type:String, trim:true, 'default':''},                         // 문제 b번
    article3:{type:String, trim:true, 'default':''},                         // 문제 c번
    article4:{type:String, trim:true, 'default':''},                         // 문제 d번
    article5:{type:String, trim:true, 'default':''},                         // 문제 e번
    article6:{type:String, trim:true, 'default':''},                         // 문제 f번
    article7:{type:String, trim:true, 'default':''},                         // 문제 g번
    
    
    answer1:{type:String, trim:true, 'default':''},                    // 사용자 선택 답 1-6, 7, 8번유형시
    answer2:{type:String, trim:true, 'default':''},                    // 사용자 선택 답 7, 8번 유형시 
    answer3:{type:String, trim:true, 'default':''},                    // 사용자 선택 답 7,8번 유형시
    answer4:{type:String, trim:true, 'default':''},                    // 사용자 선택 답 8번 유형시
    answer5:{type:String, trim:true, 'default':''},                    // 사용자 선택 답 8번 유형시
    answer6:{type:String, trim:true, 'default':''},                    // 사용자 선택 답 8번 유형시
    
    
    readingComment:{type:String, trim:true, 'default':''},              // 문제의 해설
    correctAnswer1:string,                                              // 문제 정답
    correctAnswer2:string,                                              // 문제 정답
    correctAnswer3:string,                                              // 문제 정답
    correctAnswer4:string,                                              // 문제 정답
    correctAnswer5:string,                                              // 문제 정답
    correctAnswer6:string                                              // 문제 정답
})
module.exports = mongoose.model('readingProblem', readingProblemSchema);
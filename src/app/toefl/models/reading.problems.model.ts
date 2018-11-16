
export class ReadingProblems {

    sectionNo: number;
    readingParagraphTitle: string;                                   //지문 타이틀
    readingParagraphScript: string;                                  //지문 스크립트
    readingParagraphGlossary: string;                                // 지문단어
    readingParagrphImage: string;                                    // 지문그림
    readingProblemType: number;                                      //지문유형

    question1: string;                                         //문제 1-6번까지 유형                         
    subQuestion1: string;                                      // 문제 7, 8번유형 서브문제
    subQuestion2: string;                                      // 문제 8번유형 서브문제

    article1: string;                                           // 문항 a번
    article2: string;                                           // 문항 b번
    article3: string;                                           // 문항 c번
    article4: string;                                           // 문제 d번
    article5: string;                                           // 문제 e번
    article6: string;                                           // 문제 f번
    article7: string;                                           // 문제 g번

    answer1: string;                                            // 시험자 선택 a번 
    answer2: string;                                            // 시험자 선택 b번
    answer3: string;                                            // 시험자 선택 c번
    answer4: string;                                            // 시험자 선택 d번
    answer5: string;                                            // 시험자 선택 e번
    answer6: string;                                            // 시험자 선택 f번
    
    readingComment:string;                                      // 문제 해설
    correctAnswer1:string;                                      // 문제 정답
    correctAnswer2:string;                                      // 문제 정답
    correctAnswer3:string;                                      // 문제 정답
    correctAnswer4:string;                                      // 문제 정답
    correctAnswer5:string;                                      // 문제 정답
    correctAnswer6:string;                                      // 문제 정답

            constructor(  
                                sectionNo: number,
                                readingParagraphTitle: string,                                   
                                readingParagraphScript: string,                                 
                                readingParagraphGlossary: string,                                
                                readingParagrphImage: string,                                    
                                readingProblemType: number,                                     
                            
                                question1: string,                                                          
                                subQuestion1: string,                                      
                                subQuestion2: string,                                      
                            
                                article1: string,                                           
                                article2: string,                                           
                                article3: string,                                           
                                article4: string,                                           
                                article5: string,                                           
                                article6: string,                                           
                                article7: string,                                           
                            
                                answer1: string,                                           
                                answer2: string,                                            
                                answer3: string,                                            
                                answer4: string,                                            
                                answer5: string,                                            
                                answer6: string,                                            
                                
                                readingComment:string,                                      
                                correctAnswer1:string,                                      
                                correctAnswer2:string,                                      
                                correctAnswer3:string,                                      
                                correctAnswer4:string,                                      
                                correctAnswer5:string,                                      
                                correctAnswer6:string                                      
            )

            {
                this.sectionNo = sectionNo;
                this.readingParagraphTitle = readingParagraphTitle;                                   
                this.readingParagraphScript = readingParagraphScript;                                 
                this.readingParagraphGlossary = readingParagraphGlossary;                                
                this.readingParagrphImage = readingParagrphImage;                                    
                this.readingProblemType = readingProblemType;                                     
            
                this.question1 = question1;                                                          
                this.subQuestion1 = subQuestion1;                                      
                this.subQuestion2 = subQuestion2;                                      
            
                this.article1 = article1;                                           
                this.article2 = article2;                                        
                this.article3 = article3;                                        
                this.article4 = article4;                                        
                this.article5 = article5;                                        
                this.article6 = article6;                                        
                this.article7 = article7;                                        
            
                this.answer1 = answer1;                                       
                this.answer2 = answer2;                                          
                this.answer3 = answer3;                                          
                this.answer4 = answer4;                                          
                this.answer5 = answer5;                                          
                this.answer6 = answer6;                                          
                
                this.readingComment = readingComment;                                      
                this.correctAnswer1 = correctAnswer1;                            
                this.correctAnswer2 = correctAnswer2;                            
                this.correctAnswer3 = correctAnswer3;                            
                this.correctAnswer4 = correctAnswer4;                            
                this.correctAnswer5 = correctAnswer5;                            
                this.correctAnswer6 = correctAnswer6;                           

            }
}


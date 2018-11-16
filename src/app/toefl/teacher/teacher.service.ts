import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Toefl } from '../models/toefl.model';
import { Reading } from '../models/reading.model';
import { ImageSettingTime } from '../models/image.model';

import { HttpClient } from '@angular/common/http';

import { UtilityService } from '../../Utility-shared/utility.service';
import { ProfileInfo } from '../../auth/profile.model';

@Injectable()
export class RegisterToeflService {

  registerToeflExamChanged = new Subject<Toefl[]>();

  profileInfo: ProfileInfo;
  lastToeflNo = 0;

  private date = new Date();
  private toefls: Toefl[] = [];


  constructor(private http: HttpClient,
              private utilityService: UtilityService) {}

  getRegisterToefls() {

    // 서버로 부터 모든 데이타를 가져오기 위해서는 반드시 현재 login한 userId와 token이 필요하다
    this.toefls = [];
    const token = localStorage.getItem('token');

    this.http.get<{ message: string, toefls: Toefl[] }>('http://localhost:3000/registerExam/' + '?token=' + token)
                  .subscribe( (registerToefls) => {
                    console.log(registerToefls);
                    this.toefls = [];
                    for (const toeflItem of registerToefls.toefls) {
                      this.toefls.push(toeflItem); }
                                                               // 서버로 부터 가저오는 데이타가 array형태로 unwrapping되므로
                    this.registerToeflExamChanged.next([...this.toefls]);
                                                                        // for looping으로 개별적이 toeflItem을 push로 저장해주어야 한다
              },
              (error) => console.log(error)                              // 나중에 이 error는 alert로 처리한다
              );

    return [...this.toefls];
  }

// 가장 최신 register toefl exam을 가져올때 사용
  getRegisterToefl(toeflNo: number) {
    this.registerToeflExamChanged.next([...this.toefls]);
      // 이것을 제거하면 registerExam의 listView가 업데이트가 안되고 error가 발생함

    for (let i = 0; i <= this.toefls.length; i++) {
      if (this.toefls[i].toeflNo === toeflNo) {
         return this.toefls[i];
      }
    }
  }



  getLastToeflNo() {
    return this.lastToeflNo = this.toefls.slice()[this.toefls.length - 1].toeflNo + 1;
  }

  // getToeflLastNo() {

  //   return this.http.get<{ message: string, toefls: Toefl[], lastToeflNo: number }>('http://localhost:3000/showexam')
  //           .map ( ( data ) => {
  //             this.lastToeflNo = data.lastToeflNo + 1;
  //             return this.lastToeflNo;
  //           });
  // }



  // toefllist 추가 기능
  addRegisterToeflExam(toeflNo: number, formData: FormData) {

    // 일단 onSubmit을 진행된 formData를 받아서 곧바로 toekn과 함께 posting을 server에 요청한다
    // 그런후 서버로 부터오는 결과가 error가 없으면 그결과를 res,json() object로 unwrapping 한다
    // 이제 front 쪽 toefls array에 결과물인 data.toefl을 push한후 slice를 통해 최신 toelflist를 생성한다
    // Audio Play Service 중 toefl List에서 소리가 나면 값은 "1" === 소리 실행
    // 만일 add, detail, edit component는 "2" --- 소리를 중지
    // add 와 edit 후  save 버튼을 누르면 새로 update된 값으로 소리 실행  === "3"


    const token = localStorage.getItem('token');

    // tslint:disable-next-line:max-line-length
    this.http.post<{ message: string, toefl: Toefl } >('http://localhost:3000/registerExam/' + toeflNo + '?token=' + token, formData)
                    .subscribe( (savedToefl ) => {
                            console.log('추가되기 전 토플명단', this.toefls);
                            console.log('새로 추가된 토플시험', savedToefl);
                            this.toefls.push(savedToefl.toefl);
                            console.log('추가되고 난 후 토플명단', this.toefls);
                            this.registerToeflExamChanged.next([...this.toefls]);
                           // this.utilityService.audioPlaySevice(savedToefl.toefl.toeflAudio, '3', false);
                    },
                    (error) => console.log(error)              // 나중에 이 error는 alert로 처리한다
                  );
  }

  // toefl item edit후 서버연결후 최신 toefllist로 만드는 method

  updateRegisterToeflExam(toeflNo: number, formData: FormData) {

    // add와 마찬가지로 onSubmit으로 부터 받은 데이타를 formData로 받아서 token과 같이 patch한다.
    // 그결과물을 받아 res.json()으로 upwrapping한후 toefllist에 index 값으로 update한다
    // Audio Play Service 중 toefl List에서 소리가 나면 값은 "1" === 소리 실행
    // 만일 add, detail, edit component는 "2" --- 소리를 중지
    // add 와 edit 후  save 버튼을 누르면 새로 update된 값으로 소리 실행  === "3"


    const token = localStorage.getItem('token');

    // tslint:disable-next-line:max-line-length
    this.http.patch<{ message: string, toefl: Toefl } >('http://localhost:3000/registerExam/' + toeflNo + '?token=' + token, formData)
                    .subscribe(( updatedToefl ) => {

                      console.log( '새로 수정된 토플시험', updatedToefl.toefl);
                      for(let i = 0; i < this.toefls.length; i++) {
                        if (this.toefls[i].toeflNo === updatedToefl.toefl.toeflNo) {
                          this.toefls[i] = updatedToefl.toefl;
                        }
                      }
                      this.registerToeflExamChanged.next([...this.toefls]);
                   //   this.utilityService.audioPlaySevice(updatedToefl.toefl.toeflAudio, '3', false);
                    },
                  (error) => console.log(error)
                  );
  }

  // toefl list 삭제 기능

  deleteRegisterToeflExam(toeflNo: number) {

    // Registration Toefl을 제거할때는 반드시 toeflNo가 필요하다
    // 하지만 front toeflList에서는 index number가 필요하므로 항상 1을 빼고 추가하는작없을 잊어버리면 안된다

    const token = localStorage.getItem('token');

    this.http.delete<{ message: string, toefl: Toefl}>('http://localhost:3000/registerExam/' + toeflNo + '?token=' + token)
                    .subscribe((deletedToefl) => {

                      console.log('삭제된 토플시험', deletedToefl );

                      for (let i = 0; i < this.toefls.length; i++) {
                        if (this.toefls[i].toeflNo === toeflNo) {
                          this.toefls.splice(i, 1);
                        }
                      }
                      this.registerToeflExamChanged.next([...this.toefls]);
                    },
                  (error) => console.log(error)
                  );
  }


}

import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Reading } from '../../../models/reading.model';
import { Toefl } from '../../../models/toefl.model';
import { ReadingProblems } from '../../../models/reading.problems.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { StepperModel } from '../../stepper/stepper.model';
import { Stepper } from '../../stepper/stepper-default';

@Injectable()
export class MakeExamService {
    reading: Reading;
    stepperModel: StepperModel;
    public currentToefl = new Subject<Toefl>();
    public currentStep = new Subject<string>();

    constructor(private http: Http) {}


    getReadingData(toeflNo: number) {

              // 서버로 부터 모든 데이타를 가져오기 위해서는 반드시 현재 login한 userId와 token이 필요하다

              const token = localStorage.getItem('token');

              return this.http.get('http://localhost:3000/reading/' + toeflNo + '?token=' + token)
                            .map(
                              (reading: Response) => {

                                    const data = reading.json();
                                    console.log(data);
                                    return data.reading;
                            })
                            .catch((error: Response) => this.handleErrors(error))

              }

  //toefl reading general description 추가 기능
  addReadingExam(reading: Reading) {

    const body = JSON.stringify(reading);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token');

      return this.http.post('http://localhost:3000/reading/' + '?token=' + token, body, {headers: headers})
                    .map((response: Response) => {
                      const result = response.json();
                      console.log(result);
                      return result;
                    })

                    .catch((error: Response) => this.handleErrors(error))           // 나중에 이 error는 alert로 처리한다

  }

  handleErrors(error: Response) {
    const err = error.json();
    console.log(err);
    return Observable.throw(err);
  }

  // 토플 넘버를 parameters로 넘겨야 한다

  settingCurrentStepper(currentStep: string, toeflNo: number): StepperModel {

    console.log(currentStep);
    console.log(toeflNo);
                switch (currentStep) {
                case '1':      //home

                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )
                break;
                case '2':       //toefllist
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;
                case '3':        // reading area
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    true,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )


                break;
                case '4':        // listening area
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    true,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;
                case '5':         // writing area
                this.stepperModel = new StepperModel(true,
                                                  toeflNo,
                                                  true,

                                                  false,
                                                  false,
                                                  true,
                                                  false,

                                                  false,
                                                  false,
                                                  false,
                                                  false,

                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false,

                                                  false,
                                                  false,

                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false
                                                )

                break;
                case '6':         // speaking area
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )


                break;
                case '7':         // reading section 1
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    true,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    true,
                                                    true,
                                                    true,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  );

                break;
                case '8':          // reading section 2
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,
                                                    true,
                                                    false,
                                                    false,
                                                    false,
                                                    true,
                                                    false,
                                                    true,
                                                    true,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;
                case '9':          // reading section 3
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,
                                                    true,
                                                    false,
                                                    false,
                                                    false,
                                                    true,
                                                    true,
                                                    false,
                                                    true,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )


                break;
                case '10':          // reading section 4
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    true,
                                                    false,
                                                    false,
                                                    false,

                                                    true,
                                                    true,
                                                    true,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '11':      // listening section 1
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    true,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    true,
                                                    true,
                                                    true,
                                                    true,
                                                    true,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '12':       // listening section 2
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    true,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    true,
                                                    false,
                                                    true,
                                                    true,
                                                    true,
                                                    true,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '13':        // listening section 3
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    true,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    true,
                                                    true,
                                                    false,
                                                    true,
                                                    true,
                                                    true,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '14':        // listening section 4
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    true,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    true,
                                                    true,
                                                    true,
                                                    false,
                                                    true,
                                                    true,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '15':         // listening section 5
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    true,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    true,
                                                    true,
                                                    true,
                                                    true,
                                                    false,
                                                    true,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '16':         // listening section 6
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    true,
                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    true,
                                                    true,
                                                    true,
                                                    true,
                                                    true,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '17':          // writing section 1 - integrated
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    true,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '18':          // writing section 2 - indep
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    true,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    true,
                                                    false,

                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false
                                                  )

                break;

                case '19':          // speaking type1
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    false,
                                                    true,
                                                    true,
                                                    true,
                                                    true,
                                                    true
                                                  )

                break;

                case '20':          // speaking type 2
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    true,
                                                    false,
                                                    true,
                                                    true,
                                                    true,
                                                    true
                                                  )

                break;

                case '21':          // speaking type 3
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    true,
                                                    true,
                                                    false,
                                                    true,
                                                    true,
                                                    true
                                                  )

                break;

                case '22':          // speaking type 4
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    true,
                                                    true,
                                                    true,
                                                    false,
                                                    true,
                                                    true
                                                  )

                break;

                case '23':           // speaking type5
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    true,
                                                    true,
                                                    true,
                                                    true,
                                                    false,
                                                    true
                                                  )

                break;

                case '24':           // speaking type 6
                this.stepperModel = new StepperModel(true,
                                                    toeflNo,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    true,

                                                    false,
                                                    false,
                                                    false,
                                                    false,


                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,
                                                    false,

                                                    false,
                                                    false,

                                                    true,
                                                    true,
                                                    true,
                                                    true,
                                                    true,
                                                    false
                                                  )

                break;

                }

  return this.stepperModel
}

}

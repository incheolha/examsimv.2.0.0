import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';

import {Toefl} from '../toefl/models/toefl.model';
import {ToeflExamService} from '../toefl/toeflExam/toeflexam.service';

import {Subscription} from 'rxjs/Subscription';

import { ShoppingcartService } from '../payment/shoppingcart.service';
import { PaidToeflList } from '../payment/model/paidToeflLists.model';
import { JoinPaidToefl } from '../toefl/models/join-paidtoefl-toefl.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

   // 원본 toefl list init
       toefls: Toefl[] = [];

   // 지불이 완료된 toefl list
       newPaidToeflLists: PaidToeflList[] = [];

   // paid Toefl List와 합쳐진 toefl lists
       joinPaidToefl: JoinPaidToefl;
       jointPaidToeflLists: JoinPaidToefl[] = [];

       beginnerToefls: JoinPaidToefl[] = [];
       basicToefls: JoinPaidToefl[] = [];
       intermediateToefls: JoinPaidToefl[] = [];
       advancedToefls: JoinPaidToefl[] = [];

    // 각 인증에 필요한 기능 설정
        paidToeflCheck = false;
        isAuth = false;
        isTeacherAuth = false;

    // Subscription 설정
    toeflListSubscription: Subscription;
    paidToeflListSubscription: Subscription;

    // bootstrap tab에서 사용하는 각종 기능규정

        itemsPerPage = 6;
        numberOfPaginators: number;
        paginators: Array<any> = [];

        beginnerNumberOfPaginators: number;
        beginnerPaginators: Array<any> = [];

        basicNumberOfPaginators: number;
        basicPaginators: Array<any> = [];

        interNumberOfPaginators: number;
        interPaginators: Array<any> = [];

        advNumberOfPaginators: number;
        advPaginators: Array<any> = [];



  constructor(
              private toeflExamService: ToeflExamService,
              private authService: AuthService,
              private shoppincartService: ShoppingcartService
              ) {}

   ngOnInit() {

      this.paidToeflListSubscription = this.shoppincartService.paidToeflListAdded
                                                              .subscribe((paidToeflLists: PaidToeflList[]) => {
                                                                this.newPaidToeflLists = paidToeflLists;
                                                                console.log('updated newPaid Toefl Lists: ' + this.newPaidToeflLists);
                                                              });

      this.toeflListSubscription = this.toeflExamService.toeflListChanged
                                                              .subscribe((toefls: Toefl[]) => {
                                                                this.toefls = toefls;

                                                                console.log('new paid toefl lists: ' + this.newPaidToeflLists);

                                                                if (this.newPaidToeflLists.length !== 0) {
                                                                              this.jointPaidToeflLists = [];

                                                                    for (const toeflItem of this.toefls) {
                                                                                this.paidToeflCheck = false;
                                                                        for (const paidToeflItem of this.newPaidToeflLists) {
                                                                          if ( toeflItem.toeflNo === paidToeflItem.examNo) {
                                                                                this.paidToeflCheck = true;
                                                                          }
                                                                        }
                                                                        this.joinPaidToefl = new JoinPaidToefl(toeflItem.toeflNo,
                                                                                                                toeflItem.toeflDesc,
                                                                                                                toeflItem.toeflLevel,
                                                                                                                toeflItem.toeflImage,
                                                                                                                this.paidToeflCheck);
                                                                        this.jointPaidToeflLists.push(this.joinPaidToefl);
                                                                    }
                                                                  } else {
                                                                  for (const toeflItem of this.toefls) {
                                                                      this.paidToeflCheck = false;
                                                                      this.joinPaidToefl = new JoinPaidToefl(toeflItem.toeflNo,
                                                                                                        toeflItem.toeflDesc,
                                                                                                        toeflItem.toeflLevel,
                                                                                                        toeflItem.toeflImage,
                                                                                                        this.paidToeflCheck);
                                                                      this.jointPaidToeflLists.push(this.joinPaidToefl);
                                                                  }
                                                                }

                                                            for (const eachToefl of this.jointPaidToeflLists) {
                                                              if ( eachToefl.toeflLevel === 'Beginner' ) {
                                                                    this.beginnerToefls.push(eachToefl);
                                                              } else if ( eachToefl.toeflLevel === 'Basic' ) {
                                                                    this.basicToefls.push(eachToefl);
                                                              } else if ( eachToefl.toeflLevel === 'InterMediate' ) {
                                                                    this.intermediateToefls.push(eachToefl);
                                                              } else if ( eachToefl.toeflLevel === 'Advanced' ) {
                                                                    this.advancedToefls.push(eachToefl);
                                                              }
                                                          }

                                                        this.calculatePagenator(this.jointPaidToeflLists,
                                                                                this.beginnerToefls,
                                                                                this.basicToefls,
                                                                                this.intermediateToefls,
                                                                                this.advancedToefls);


                                                      console.log('this is join paid toefl lists: ' + this.jointPaidToeflLists);
                                                              });

      this.toeflExamService.getAllToeflLists();
      this.newPaidToeflLists = this.shoppincartService.getPaidToefltLists();
      this.isAuth = this.authService.isAuthenticated;         // 일반 사용자 인증
      this.isTeacherAuth = this.authService.isteacherAuthenticated;   // teacher 관리자 인증
    }

    ngOnDestroy() {
      this.toeflListSubscription.unsubscribe();
      this.paidToeflListSubscription.unsubscribe();
    }

    calculatePagenator(toefls, beginnerToefls, basicToefls, interToefls, advancedToefls) {

           // 모든 토플 명단에 관한 pagenator 산출
           if (toefls.length % this.itemsPerPage === 0) {
                this.numberOfPaginators = Math.floor(toefls.length / this.itemsPerPage);
          } else {
                this.numberOfPaginators = Math.floor(toefls.length / this.itemsPerPage + 1);
          }

                for (let i = 1; i <= this.numberOfPaginators; i++) {
                      this.paginators.push(i);
                }

          // beginner level toefl pagenator 산출

          if (beginnerToefls.length % this.itemsPerPage === 0) {
                this.beginnerNumberOfPaginators = Math.floor(beginnerToefls.length / this.itemsPerPage);
          } else {
                this.beginnerNumberOfPaginators = Math.floor(beginnerToefls.length / this.itemsPerPage + 1);
          }

                for (let i = 1; i <= this.beginnerNumberOfPaginators; i++) {
                      this.beginnerPaginators.push(i);
                }

         // basic level toefl pagenator 산출

          if (basicToefls.length % this.itemsPerPage === 0) {
                this.basicNumberOfPaginators = Math.floor(basicToefls.length / this.itemsPerPage);
              } else {
                    this.basicNumberOfPaginators = Math.floor(basicToefls.length / this.itemsPerPage + 1);
          }
                  for (let i = 1; i <= this.basicNumberOfPaginators; i++) {
                    this.basicPaginators.push(i);
                  }


           // intermediate level toefl pagenator 산출

           if (interToefls.length % this.itemsPerPage === 0) {
                this.interNumberOfPaginators = Math.floor(interToefls.length / this.itemsPerPage);
              } else {
                this.interNumberOfPaginators = Math.floor(interToefls.length / this.itemsPerPage + 1);
            }
                for (let i = 1; i <= this.interNumberOfPaginators; i++) {
                  this.interPaginators.push(i);
                }

        // advanced level toefl pagenator 산출

            if (advancedToefls.length % this.itemsPerPage === 0) {
                  this.advNumberOfPaginators = Math.floor(advancedToefls.length / this.itemsPerPage);
            } else {
                  this.advNumberOfPaginators = Math.floor(advancedToefls.length / this.itemsPerPage + 1);
            }
                for (let i = 1; i <= this.advNumberOfPaginators; i++) {
                      this.advPaginators.push(i);
                }
    }
}

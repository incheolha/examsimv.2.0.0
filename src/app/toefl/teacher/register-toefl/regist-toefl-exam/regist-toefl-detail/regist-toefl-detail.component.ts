
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Toefl } from './../../../../models/toefl.model';
import { RegisterToeflService } from '../../../teacher.service';
import { UtilityService } from '../../../../../Utility-shared/utility.service';


@Component({
  selector: 'app-regist-toefl-detail',
  templateUrl: './regist-toefl-detail.component.html',
  styleUrls: ['./regist-toefl-detail.component.scss']
})
export class RegistToeflDetailComponent implements OnInit {

  toefl: Toefl;           // toefl model 적용

  audio = new Audio();   // Audio instance 발생시킴
  toeflNo: number;
  lastId: number;            // parameter 아이디로 route의 params정보로 부터 넘어오는 toefl No를 지정하기위한 변수

  stepperCheck = false;

  constructor(private registerToeflService: RegisterToeflService,
              private utilityService: UtilityService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    // Audio Play Service 중 toefl List, detail에서 소리가 나면 값은 "1" === 소리 실행
    // 만일 add,  edit component는 "2" --- 소리를 중지
    // add 와 edit 후  save 버튼을 누르면 새로 update된 값으로 소리 실행  === "3"

    this.route.params.subscribe((params: Params) => {

                                  this.toeflNo = +params['id'];

                                  console.log(this.toeflNo);
                                  this.toefl = this.registerToeflService.getRegisterToefl(this.toeflNo);
                                  this.utilityService.audioPlaySevice(this.toefl.toeflAudio, '1', false);
    });

    this.utilityService.stepperCheck.subscribe((stepperCheck: boolean) => {
                this.stepperCheck = stepperCheck;
                console.log(stepperCheck);
    })
  }

  onEditToeflRegistration() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onMakeExam() {
    console.log('make exam clicked....');
    this.utilityService.toeflListShowChanged.next(true);                    // toefl List 값이 바뀜을 알려준다
    this.utilityService.teacherNavSideBarChanged.next(true);                // NavSideBar가 비뀜을 알려준다
    this.router.navigate(['makeexam'], { relativeTo: this.route });         // makeExam으로 넘어간다
  }
  onDeleteRegistration() {
    // registration Toefl을 지우기 위해서는 toefl No 가 아닌 this.id(index)값을 parameter로 넘겨준다
  this.registerToeflService.deleteRegisterToeflExam(this.toeflNo);
  this.router.navigate( ['../'], { relativeTo: this.route} );
  }
}


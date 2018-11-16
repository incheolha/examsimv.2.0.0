
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { UtilityService } from './../../../../../Utility-shared/utility.service';
import { MakeExamService } from '../makeexam.service';
import { RegisterToeflService } from '../../../teacher.service';
import { Toefl } from '../../../../models/toefl.model';


import { CurrentStep } from './../../../stepper/stepper-default';
import { StepperModel } from '../../../stepper/stepper.model';
@Component({
  selector: 'app-make-exam-start',
  templateUrl: './make-exam-start.component.html',
  styleUrls: ['./make-exam-start.component.scss']
})
export class MakeExamStartComponent implements OnInit {

  @ViewChild('staticTabs') public staticTabs;
  toeflNo: number;
  currentToefl: Toefl;

  currentStep: StepperModel;

  readingFormGroup: FormGroup;
  listeningFormGroup: FormGroup;


      constructor(private utilityService: UtilityService,
                  private registerToeflService: RegisterToeflService,
                  private makeExamService: MakeExamService,
                  private route: ActivatedRoute,
                  private router: Router
                ) {}

  ngOnInit() {

           // this.staticTabs.setActiveTab('1');
  
            this.utilityService.audioPlaySevice(null, '2', false);     // register toefl detail에서 makeexam
            this.utilityService.toeflListShowChanged.next(true);

            this.route.params.subscribe((params: Params) => {
                                          this.toeflNo = +params['id'];
                                          console.log(this.toeflNo);
                                          this.currentToefl = this.registerToeflService.getRegisterToefl(this.toeflNo);
                              });
            this.currentStep = this.makeExamService.settingCurrentStepper('3', this.toeflNo);
  }

  onSelectReading() {
    
    this.currentStep = this.makeExamService.settingCurrentStepper('3', this.toeflNo);
  }
  onSelectListening() {
    
    this.currentStep = this.makeExamService.settingCurrentStepper('4', this.toeflNo);
   
  }
  onSelectWriting() {
    this.currentStep = this.makeExamService.settingCurrentStepper('5', this.toeflNo);
  }
  onSelectSpeaking() {
    this.currentStep = this.makeExamService.settingCurrentStepper('6', this.toeflNo);
  }

}

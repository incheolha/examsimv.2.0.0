import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Reading } from './../../../../../models/reading.model';
import { ReadingService } from '../reading.service';

import { ExecutableCommandService } from '../../../../../../tony-editorv1.0.0/services/executable-command.service';
import { MakeExamService } from '../../makeexam.service';
import { StepperModel } from '../../../../stepper/stepper.model';
import { UtilityService } from '../../../../../../Utility-shared/utility.service';

@Component({
  selector: 'app-reading-section2',
  templateUrl: './reading-section2.component.html',
  styleUrls: ['./reading-section2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReadingSection2Component implements OnInit, OnDestroy {

  htmlContent: string;
  savedSectionContentString;

  htmlSubscription: Subscription;
  readingSection2: FormGroup;
  savedSectiontitle = '';
  savedSectionContent: any;

  toeflNo: number;
  currentDate = new Date();
  isAlreadySaved = false;
  updateMode = false;

  currentStep: StepperModel;

  @ViewChild('contentArea') contentArea: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readingService: ReadingService,
              private makeExamService: MakeExamService,
              private utilityService: UtilityService,
              private executableCommandService: ExecutableCommandService,
              private snatizer: DomSanitizer       // [innerHTML]="htmlContent"표현시 반드시 이것을 사용하여
                                                   // 표현 해야만 정상적인 html style을 적용할수 있음
                                                   // 또한 이것을 사용하는 이유는 web injection hacking 기법을 차단하기위함
  ) { }

  ngOnInit() {
   
    this.utilityService.stepperCheck.next(true);     // steppper로 부터 routing되었는지 여부확인
                                                     // toefl List component가 자동으로 뜨는 문제 해결위해 사용
    this.readingSection2 = new FormGroup( {
      'toeflNo': new FormControl(null, Validators.required),
      'section2Title' : new FormControl('', Validators.required),
      'section2Script' : new FormControl('', Validators.required)
    });

    this.route.params.subscribe((params: Params) => {
            this.toeflNo = +params['id'];
    });

        
    this.currentStep = this.makeExamService.settingCurrentStepper('8', this.toeflNo);
    console.log(this.currentStep);
   
    this.readingService.getReadingSection(this.toeflNo).subscribe( result => {
                  if (!result.reading) {
                    this.isAlreadySaved = false;
                  } else {
                    if (result.reading.section2Title === '' || !result.reading.section2Title) {
                      this.isAlreadySaved = false;
                      this.updateMode = true;
                    } else {
                      this.isAlreadySaved = true;
                      this.savedSectiontitle = result.reading.section2Title;
                      // 아래와 같이 savedSectionContentString변수 한개를 더만들어 string으로 저장하는 이유는
                      // tonyEditor에 property binding형태로 넘겨 주어야 하기때문
                      // property binding시 반드시 string으로 넘겨 주어야만 정상적으로 editor내 textArea에 표현가능함
  
                      this.savedSectionContentString = result.reading.section2Script;
                      this.savedSectionContent = this.snatizer.bypassSecurityTrustHtml(result.reading.section2Script);
  
                    }
                  }
          },
            error => console.log(error)
          );

    this.htmlSubscription = this.executableCommandService.htmlContent.subscribe((html: string) => {
      this.htmlContent = html;
    });

  }

  ngOnDestroy() {
    this.htmlSubscription.unsubscribe();
  }

  onSubmit() {

    if (this.readingSection2.value.section2Title && this.htmlContent) {
          const reading2 = new Reading(this.toeflNo,
                                this.currentDate,
                                '',
                                '',
                                [],
                                this.readingSection2.value.section2Title,
                                this.htmlContent);
          if (!this.updateMode) {
              this.readingService.addReadingSection(reading2)
                                  .subscribe(result => {

                                    this.isAlreadySaved = true;
                                    this.savedSectiontitle = result.reading.section2Title;
                                    this.savedSectionContent =
                                                     this.snatizer.bypassSecurityTrustHtml(result.reading.section2Script);
                                    this.savedSectionContentString = result.reading.section2Script;
                                  },
                                  error => console.log(error)
                                );
          } else {
            this.readingService.updateReadingSection(reading2)
                                .subscribe(result => {

                                  this.isAlreadySaved = true;
                                  this.savedSectiontitle = result.reading.section2Title;
                                  this.savedSectionContent =
                                           this.snatizer.bypassSecurityTrustHtml(result.reading.section2Script);
                                  this.savedSectionContentString = result.reading.section2Script;
                                },
                                error => console.log(error));
          }
    }

    this.readingSection2.reset();
    this.htmlContent = '';

  }

  onEdit() {
    console.log('edit click');
    this.isAlreadySaved = false;
    this.readingSection2 = new FormGroup( {
      'toeflNo': new FormControl(this.toeflNo, Validators.required),
      'section2Title' : new FormControl(this.savedSectiontitle, Validators.required),
      'section2Script' : new FormControl('', Validators.required)
    });
    
    this.htmlContent = this.savedSectionContentString;
    console.log(this.htmlContent);
    this.updateMode = true;
  }
  onDelete() {
    console.log('delete click');
  }

  onMakeExam() {
    console.log('make exam click');
      }
}

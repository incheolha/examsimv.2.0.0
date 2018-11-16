import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { StepperModel } from './stepper.model';
import { UtilityService } from '../../../Utility-shared/utility.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input() currentStep: StepperModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private utilityService: UtilityService) { }

  ngOnInit() {

    console.log(this.currentStep);
    console.log(this.currentStep.toeflNo);

    

  }

  onMainHome() {
  
    this.router.navigate(['/teacher']);
  }
  onToelfList() {
    console.log('toeflList stepper clicked');
    console.log(this.currentStep.toeflNo);

    this.router.navigate(['/teacher/' + this.currentStep.toeflNo]);

  }
  
  onToelfMakeExam() {
    console.log('Reading Area stepper clicked');
    console.log(this.currentStep.toeflNo);
    this.router.navigate(['/teacher/' + this.currentStep.toeflNo + '/makeexam']);

  }

  onToelfMakeExamSection1(){
    console.log('Reading Area stepper clicked');
    console.log(this.currentStep.toeflNo);
    this.router.navigate(['/teacher/' + this.currentStep.toeflNo + '/makeexam/readingSection1']);
  }

  onToelfMakeExamSection2(){
    console.log('Reading Area stepper clicked');
    console.log(this.currentStep.toeflNo);
    this.router.navigate(['/teacher/' + this.currentStep.toeflNo + '/makeexam/readingSection2']);
  }

  onToelfMakeExamSection3(){
    console.log('Reading Area stepper clicked');
    console.log(this.currentStep.toeflNo);
    this.router.navigate(['/teacher/' + this.currentStep.toeflNo + '/makeexam/readingSection3']);
  }

  onToelfMakeExamSection4(){
    console.log('Reading Area stepper clicked');
    console.log(this.currentStep.toeflNo);
    this.router.navigate(['/teacher/' + this.currentStep.toeflNo + '/makeexam/readingSection4']);
  }

}

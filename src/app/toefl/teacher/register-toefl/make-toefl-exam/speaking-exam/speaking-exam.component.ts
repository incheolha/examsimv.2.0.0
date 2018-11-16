import { Component, OnInit, Input } from '@angular/core';
import { Toefl } from '../../../../models/toefl.model';
import defaultToeflData from '../../../../models/default.data.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-speaking-exam',
  templateUrl: './speaking-exam.component.html',
  styleUrls: ['./speaking-exam.component.scss']
})
export class SpeakingExamComponent implements OnInit {
  currentDate = Date.now();
  @Input() currentToefl: Toefl;
  @Input() currentSpeakingStepper: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.currentToefl);
  }
    onSpeakingingProblem1() {
      console.log('clicked');
    }
    onSpeakingingProblem2() {
      console.log('clicked');
    }
    onSpeakingingProblem3() {
      console.log('clicked');
    }
    onSpeakingingProblem4() {
      console.log('clicked');
    }
    onSpeakingingProblem5() {
      console.log('clicked');
    }
    onSpeakingingProblem6() {
      console.log('clicked');
    }
}

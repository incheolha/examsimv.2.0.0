import { Component, OnInit, Input } from '@angular/core';
import { Toefl } from '../../../../models/toefl.model';
import defaultToeflData from '../../../../models/default.data.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-writing-exam',
  templateUrl: './writing-exam.component.html',
  styleUrls: ['./writing-exam.component.scss']
})
export class WritingExamComponent implements OnInit {

  currentDate = Date.now();
  @Input() currentToefl: Toefl;
  @Input() currentWritingStepper: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {

    console.log(this.currentToefl);
  }

  onWritingProlem1() {
    console.log(' writing problem 1 ....');
  }
  onWritingProlem2() {
    console.log(' writing problem 1 ....');
  }
}

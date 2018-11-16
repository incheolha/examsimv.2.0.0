import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Toefl } from '../../../../models/toefl.model';

@Component({
  selector: 'app-listening-exam',
  templateUrl: './listening-exam.component.html',
  styleUrls: ['./listening-exam.component.scss']
})
export class ListeningExamComponent implements OnInit {

  currentDate = Date.now();
  @Input() currentToefl: Toefl;
  @Input() currentListeningStepper: boolean;
  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.currentToefl);
  }

  onListeningProblem1() {
    console.log( 'listening problems 1...');
  }
  onListeningProblem2() {
    console.log( 'listening problems 1...');
  }
  onListeningProblem3() {
    console.log( 'listening problems 1...');
  }
  onListeningProblem4() {
    console.log( 'listening problems 1...');
  }
  onListeningProblem5() {
    console.log( 'listening problems 1...');
  }
  onListeningProblem6() {
    console.log( 'listening problems 1...');
  }
}

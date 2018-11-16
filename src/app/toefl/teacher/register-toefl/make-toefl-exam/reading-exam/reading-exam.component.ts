import { Component, OnInit, Input } from '@angular/core';
import { Toefl } from '../../../../models/toefl.model';
import defaultToeflData from '../../../../models/default.data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MakeExamService } from '../makeexam.service';
@Component({
  selector: 'app-reading-exam',
  templateUrl: './reading-exam.component.html',
  styleUrls: ['./reading-exam.component.scss']
})
export class ReadingExamComponent implements OnInit {

  @Input() currentToefl: Toefl;
  
  currentDate = Date.now();
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
   console.log(this.currentToefl);
  }

  onReadingSection1() {
    console.log('section1 clicked');
    
    this.router.navigate(['readingSection1'], {relativeTo: this.route });
  }
  onReadingSection2() {
    console.log('section2 clicked');
    this.router.navigate(['readingSection2'], {relativeTo: this.route });
  }
  onReadingSection3() {
    
    console.log('section3 clicked');
    this.router.navigate(['readingSection3'], {relativeTo: this.route });
  }
  onReadingSection4() {
    
    console.log('section4 clicked');
    this.router.navigate(['readingSection4'], {relativeTo: this.route });
  }

}

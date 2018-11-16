
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../Utility-shared/utility.service';
import { MainNavModel } from './../../../../Utility-shared/mainNavChange.model';

@Component({
  selector: 'app-teacher-nav-header',
  templateUrl: './teacher-nav-header.component.html',
  styleUrls: ['./teacher-nav-header.component.scss']
})

export class TeacherNavHeaderComponent {

  mainNavModel: MainNavModel;

  @Output() sidenavToggle1 = new EventEmitter<void>();

  constructor(private router: Router,
              private utilityService: UtilityService) { }

  goBackHome() {

    console.log('메인 홈페이지로 이동하는 기능');

    this.utilityService.audioPlaySevice('', '0', false);
    this.mainNavModel = new MainNavModel(false, false, true);
                                                                   // 앞에것은 showNav값 이고 뒤에것은 logout이 아닌경우 즉 home button click시
    this.utilityService.mainNavChanged.next(this.mainNavModel);    // main 화면 navigation활성화
    this.router.navigate(['/']);
  }
  onToggleSideNav() {
    console.log('side button clicked');
    this.sidenavToggle1.emit();
  }
}

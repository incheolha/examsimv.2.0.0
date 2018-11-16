
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Toefl } from '../../../../../models/toefl.model';
import { Subscription } from 'rxjs/Subscription';
import { RegisterToeflService } from '../../../../teacher.service';
import { UtilityService } from './../../../../../../Utility-shared/utility.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-regist-item',
  templateUrl: './regist-item.component.html',
  styleUrls: ['./regist-item.component.scss']
})
export class RegistItemComponent implements OnInit, OnDestroy {

 @Input() toefl: Toefl;
 @Input() index: number;
  soundOnOff = false;
  soundSubscription: Subscription;

  constructor(private registerToeflService: RegisterToeflService,
              private router: Router,
              private utilityService: UtilityService) {}
  ngOnInit() {

  this.router.navigated = true;
  this.soundSubscription = this.utilityService.soundButtonChanged
                           .subscribe((soundStatus: boolean) => {
                                      this.soundOnOff = soundStatus;
                                      });
  }

  onSound(soundCheck: boolean) {

    // this.toefl.toefAudioㄴ는 실제 array안에들어있는 toefl Audio URl 이다
    // toeflList에서 소리가 들리는지를 확인하기 위한값으로 toefl List에서 소리가 시작되면
    // 현재 soundCheck에서 소리가 진행하는지 여부를 확인하는 버튼
    // Audio Play Service 중 toefl List에서 소리가 나면 값은 "1" === 소리 실행
    // 만일 add, detail, edit component는 "2" --- 소리를 중지
    // add 와 edit 후  save 버튼을 누르면 새로 update된 값으로 소리 실행  === "3"


    if (soundCheck) {
      this.utilityService.audioPlaySevice(this.toefl.toeflAudio, '2', soundCheck);
    } else {
      this.utilityService.audioPlaySevice(this.toefl.toeflAudio, '1', soundCheck);
    }
  }

  ngOnDestroy() {
    this.soundSubscription.unsubscribe();
  }
}

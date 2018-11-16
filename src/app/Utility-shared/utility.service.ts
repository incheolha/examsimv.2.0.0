import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MainNavModel } from './mainNavChange.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilityService {

  public loadingStateChanged = new Subject<boolean>();
  public soundButtonChanged = new Subject<boolean>();   // toefl list에서 audio button을 클릭하였을때를 감시하는 subject
  public audioPathChanged = new Subject<string>();
  public mainNavChanged = new Subject<MainNavModel>();        // main Nav 화면 보이고 안보이고 할때
  public toeflListShowChanged = new Subject<boolean>();    // toefl list를 화면에 보이고 안보이고 할때 사용
  public teacherNavSideBarChanged = new Subject<boolean>();  // make exam 생성시 teacher navigation의 sidebar를 보이거나 안보이거나 할때 사용
  public stepperCheck = new Subject<boolean>();              // stepper 단계 점검시 사용
  private audio = new Audio();

  private options = { positionClass: 'toast-top-full-width', closeButton: true, progressBar: true };

  constructor(private toaster: ToastrService) { }


  successToast(title, message) {
    this.toaster.success(title, message, this.options);
  }

 errorToast(title, message) {
   this.toaster.error(title, message, this.options);
 }

 getChangedAudioUrl(audioPath: string) {
  this.audioPathChanged.next(audioPath);
 }

 audioPlaySevice(audioPath: string, soundLocationMode: string, soundButton: boolean) {
  // 만일 toefl List를 보여주는 것이라면 audio.play()가 실행되고 있는지의 여부를 확인하여
  // 실행되고 있다면 반드시 중지 시키고 새로 시작하여야만 중복된 소리가 들리지 않는다
  // Audio Play Service 중 toefl List에서 소리가 나면 값은 "1" === 소리 실행
    // 만일 add, detail, edit component는 "2" --- 소리를 중지
    // add 와 edit 후  save 버튼을 누르면 새로 update된 값으로 소리 실행  === "3"

  console.log('this is the service area:' + this.soundButtonChanged);
  console.log(soundLocationMode);

        if (soundLocationMode === '0') {
          this.audio.pause();
        }
        if (soundLocationMode === '1') {

              if (soundButton) {
                if (this.audio.play()) {
                  this.audio.pause();
                  this.soundButtonChanged.next(true);
                }
              } else {
                  if (this.audio.play()) {
                    this.audio.pause();
                  }
                  this.audio = new Audio();
                  this.audio.src = audioPath;
                  this.audio.autoplay = true;
                  this.audio.loop = true;
                  this.soundButtonChanged.next(false);
                }
        }
        if (soundLocationMode === '2') {

                if (this.audio.play()) {
                  this.audio.pause();
                }
                this.soundButtonChanged.next(true);
        }
        if (soundLocationMode === '3') {

                if (this.audio.play()) {
                  this.audio.pause();
                }
                  this.audio = new Audio();
                  this.audio.src = audioPath;
                  this.audio.autoplay = true;
                  this.audio.loop = true;
                  this.soundButtonChanged.next(false);
        }
    }

 }

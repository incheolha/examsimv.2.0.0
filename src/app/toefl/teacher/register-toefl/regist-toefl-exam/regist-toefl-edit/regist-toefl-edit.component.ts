import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { RegisterToeflService } from '../../../teacher.service';
import { UtilityService } from './../../../../../Utility-shared/utility.service';
import { Subscription } from 'rxjs/Subscription';
import DefaultDataDesc from '../../../../models/default.data.model';
@Component({
  selector: 'app-regist-toefl-edit',
  templateUrl: './regist-toefl-edit.component.html',
  styleUrls: ['./regist-toefl-edit.component.scss']
})
export class RegistToeflEditComponent implements OnInit, OnDestroy {

  levelSelect: Array<any>;
  makeExam: {desc: string}[];
  audioPathChangedSubScription: Subscription;

  upLoadImageFile: File = null;
  upLoadAudioFile: File = null;
  toeflFiles: Array<File> = [];
  imageTag = null;
  audioTag = null;

  imagePath: any = '../../../../../../assets/img/toeflLogo.png';                        // html 내 preview에 image 보여주기위한 기본값
  audioPath: any = '../../../../../../assets/audio/toeflAudioDefault.mp3';              // html 내 preview에 audio 보여주기위한 기본값

  readings = [];
  imageSettingTimes = [];

  registerToeflForm: FormGroup;


  toeflNo = 0;
  editMode = false;
  currentTime = new Date();
  completionTag = 'not completed';

  constructor(private registerToeflService: RegisterToeflService,
              private utilityService: UtilityService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.levelSelect = [
                          { value: 'Beginner', label: 'Beginner' },
                          { value: 'Basic', label: 'Basic' },
                          { value: 'InterMediate', label: 'InterMediate' },
                          { value: 'Advanced', label: 'Advanced' },
                          { value: 'Most Cmparative', label: 'Most Cmparative' },
                      ];


    // Audio Play Service 중 toefl List에서 소리가 나면 값은 "1" === 소리 실행
    // 만일 add, detail, edit component는 "2" --- 소리를 중지
    // add 와 edit 후  save 버튼을 누르면 새로 update된 값으로 소리 실행  === "3"

    this.route.params.subscribe( ( params: Params ) => {
                                  this.toeflNo = +params['id'];
                                  this.editMode = params['id'] != null;
                                  console.log('toefle edit 모드인지 아닌지 검사', this.editMode);
                                  this.initForm();
                                 // this.utilityService.audioPlaySevice(null, '2', false);

    });

    this.audioPathChangedSubScription = this.utilityService.audioPathChanged.subscribe((audioUrl: string) => {
      console.log(audioUrl);
      this.audioPath = audioUrl;
    });

  }

  private initForm() {

    // const toeflImageSettingTimes = new FormArray([]);

    this.makeExam = DefaultDataDesc;

    let levelSelect = '';
    let toeflDesc = this.makeExam[0].desc;

   console.log(toeflDesc);

    console.log('ㅇ이지점 점검부위임');
    console.log(this.editMode);
    if (this.editMode) {
      const registerToefl = this.registerToeflService.getRegisterToefl(this.toeflNo);
      levelSelect = registerToefl.toeflLevel;
      toeflDesc = registerToefl.toeflDesc;
      this.imagePath = registerToefl.toeflImage;
      this.audioPath = registerToefl.toeflAudio;

      // 이미지 와 오디오 URL에서 filename만 추출하기

      this.imageTag = this.imagePath.substring(this.imagePath.lastIndexOf('/') + 1);
      this.audioTag = this.audioPath.substring(this.audioPath.lastIndexOf('/') + 1 );


      // 앞으로 진행할 여러개의 이미즈를 upload할때 사용할 formarray 처리부분임 - 삭제하지 말것

      // if (registerToefl['imageSettingTimes']) {
      //   for (const imageSetTime of registerToefl.imageSettingTimes) {
      //       toeflImageSettingTimes.push(
      //         new FormGroup({
      //           'imageUrl': new FormControl(imageSetTime.imageUrl),
      //           'imageShowTime': new FormControl(imageSetTime.imageShowTime, [
      //                                                                           Validators.required,
      //                                                                           Validators.pattern(/^[1-9]+[0-9]*$/)
      //                                             ])
      //                       })
      //       );
      //   }
      // }


    } else {
      this.toeflNo = this.registerToeflService.getLastToeflNo();
      console.log('adding toefl no is ', this.toeflNo);
      this.imageTag = 'Default Image Selected';
      this.audioTag = 'Default Audio Selected';

    }

    // 이부분은 editmode 이든 newMode이든 무조건 실행하여야 한다

      this.registerToeflForm = new FormGroup({
          'levelSelect': new FormControl(levelSelect, Validators.required),
          'toeflDesc': new FormControl(toeflDesc, Validators.required),
          'imagePath': new FormControl(this.imagePath),
          'audioPath': new FormControl(this.audioPath)

          // 'imageSettingTimes': toeflImageSettingTimes

          });

  }

  // 이부분의 method또한 여러장의 이미지를 가져올 imageSetttingTime에 필요한 method이고 html에서 controls부위가 error가 떨어지므로
  // 반드시 이부위를 html에서 빼내 새로운 method로 만들었음 그러니 까먹지 말것 ㅋㅋㅋㅋ
  // getControls() {
  //   return (<FormArray>this.registerToeflForm.get('imageSettingTimes')).controls;
  // }

  // upload InputFile 처리 하는 방법중 imagefile 처리

  // onHandleImageFileInput(file: FileList) {
  //   this.upLoadImageFile = file.item(0);
  //   console.log(this.upLoadImageFile);
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imagePath = event.target.result;
                                          // 이 부분은 html문서의 이미지 preview에 사용할 id 값지정한것임
  //   };
  //   reader.readAsDataURL(this.upLoadImageFile);
  //   console.log(this.imagePath);
  //   console.log(this.upLoadImageFile);
  //   this.imageTag = this.upLoadImageFile.name;

  // }
  // onHandleAudioFileInput(file: FileList) {
  //   this.upLoadAudioFile = file.item(0);
  //   console.log(this.upLoadAudioFile);
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.audioPath = event.target.result;


                                   // 이 부분은 html문서의 이미지 preview에 사용할 id 값지정한것임
  //   };
  //   reader.readAsDataURL(this.upLoadAudioFile);

  //   console.log(this.audioPath);
  //   console.log(this.upLoadAudioFile);
  //   this.audioTag = this.upLoadAudioFile.name;
  //   this.utilityService.getChangedAudioUrl(this.audioTag);

  // }

  onImagePicked(event: Event) {
    this.upLoadImageFile = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePath = reader.result;
    };
    console.log(this.upLoadImageFile);
    reader.readAsDataURL(this.upLoadImageFile);
    this.imageTag = this.upLoadImageFile.name;

  }

  onAudioPicked(event: Event) {
    this.upLoadAudioFile = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.audioPath = reader.result;
    };
    reader.readAsDataURL(this.upLoadAudioFile);
    this.audioTag = this.upLoadAudioFile.name;

  }


  onSubmit() {

    console.log('onSubmit process.....');

    // 주의 fornData는 string만을 parameter값으로 할수 있으므로 반드시 date(), number는 toString을 변환하여 backend에 넘겨야함
    const formData = new FormData();

          formData.append('toeflDesc', this.registerToeflForm.value['toeflDesc']);
          formData.append('toeflLevel', this.registerToeflForm.value['levelSelect']);
          formData.append('toeflCompletionTag', this.completionTag);
          formData.append('toeflImage', this.imagePath);
          formData.append('toeflAudio', this.audioPath);
          formData.append('readingDesc', this.makeExam[1].desc);                         // reading general desc
          formData.append('listeningDesc', this.makeExam[2].desc);                       // listening general desc
          formData.append('writingDesc', this.makeExam[3].desc);                         // writing general desc
          formData.append('speakingDesc', this.makeExam[4].desc);                        // speaking general desc

                    if (this.upLoadImageFile) {
                      formData.append('toeflFiles', this.upLoadImageFile);
                    }
                    if (this.upLoadAudioFile) {
                      formData.append('toeflFiles', this.upLoadAudioFile);
                    }

    if (this.editMode) {
          this.registerToeflService.updateRegisterToeflExam(this.toeflNo, formData);

        } else {
          console.log('최종적으로 정해진 toefl no', this.toeflNo );
          this.registerToeflService.addRegisterToeflExam(this.toeflNo, formData);
        }
     this.registerToeflForm.reset();
      this.onCancel();
  }


  // onAddImageShowTime() {
  //   (<FormArray>this.registerToeflForm.get('imageSettingTimes')).push(
  //     new FormGroup({
  //       'imageUrl': new FormControl(null, Validators.required),
  //       'imageShowTime': new FormControl(null, [
  //                                                 Validators.required,
  //                                                 Validators.pattern(/^[1-9]+[0-9]*$/)
  //                                               ])
  //                   })
  //   );
  // }

  onDeleteImageShowTime(index: number) {
    (<FormArray>this.registerToeflForm.get('imageSettingTimes')).removeAt(index);
  }

  onCancel() {
      this.router.navigate( ['../'], { relativeTo: this.route} );
  }

ngOnDestroy() {
  this.audioPathChangedSubScription.unsubscribe();

}
}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { TeacherRoutingModule } from './teacher-routing.module';

import { AuthGuard } from '../../auth/auth.guard';

import { RegisterToeflStartComponent } from './register-toefl/register-toefl-start/register-toefl-start.component';
import { RegisterToeflComponent } from './register-toefl.component';
import { RegistToeflListComponent } from './register-toefl/regist-toefl-exam/regist-toefl-list/regist-toefl-list.component';
import { RegistToeflDetailComponent } from './register-toefl/regist-toefl-exam/regist-toefl-detail/regist-toefl-detail.component';
import { RegistItemComponent } from './register-toefl/regist-toefl-exam/regist-toefl-list/regist-item/regist-item.component';
import { RegistToeflEditComponent } from './register-toefl/regist-toefl-exam/regist-toefl-edit/regist-toefl-edit.component';
import { RegisterToeflService } from './teacher.service';

import { SharedModule } from '../../shared/shared.module';

import { TeacherNavHeaderComponent } from './teacher-navigation/teacher-nav-header/teacher-nav-header.component';
import { TeacherSidebarComponent } from './teacher-navigation/teacher-sidebar/teacher-sidebar.component';


import { MakeExamStartComponent } from './register-toefl/make-toefl-exam/make-exam-start/make-exam-start.component';
import { ListeningExamComponent } from './register-toefl/make-toefl-exam/listening-exam/listening-exam.component';
import { WritingExamComponent } from './register-toefl/make-toefl-exam/writing-exam/writing-exam.component';
import { SpeakingExamComponent } from './register-toefl/make-toefl-exam/speaking-exam/speaking-exam.component';
import { MakeExamService } from '../teacher/register-toefl/make-toefl-exam/makeexam.service';

import { ReadingExamComponent } from './register-toefl/make-toefl-exam/reading-exam/reading-exam.component';
import { EditReadingDescComponent } from './register-toefl/make-toefl-exam/reading-exam/edit-reading-desc/edit-reading-desc.component';
import { ReadingSection1Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section1/reading-section1.component';
import { ReadingSection2Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section2/reading-section2.component';
import { ReadingSection3Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section3/reading-section3.component';
import { ReadingSection4Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section4/reading-section4.component';
import { ReadingProblemsComponent } from './register-toefl/make-toefl-exam/reading-exam/reading-problems/reading-problems.component';
import { ReadingService } from './register-toefl/make-toefl-exam/reading-exam/reading.service';

import { TonyEditorComponent } from '../../tony-editorv1.0.0/tony-editor/tony-editor.component';
import { TonyEditorToolbarComponent } from '../../tony-editorv1.0.0/tony-editor.toolbar/tony-editor.toolbar.component';

import { ExecutableCommandService } from '../../tony-editorv1.0.0/services/executable-command.service';
import { StepperComponent } from './stepper/stepper.component';

import { ShortenPipe1 } from '../../shared/pipe-collection/shorten.pipe.1';

@NgModule({
  declarations: [
    RegisterToeflComponent,
    RegistToeflListComponent,
    RegistToeflDetailComponent,
    RegistItemComponent,
    RegisterToeflStartComponent,
    RegistToeflEditComponent,
    MakeExamStartComponent,
    TeacherNavHeaderComponent,
    TeacherSidebarComponent,
    ReadingExamComponent,
    ListeningExamComponent,
    WritingExamComponent,
    SpeakingExamComponent,
    EditReadingDescComponent,
    ReadingSection1Component,
    ReadingSection2Component,
    ReadingSection3Component,
    ReadingSection4Component,
    TonyEditorComponent,
    TonyEditorToolbarComponent,
    ReadingProblemsComponent,
    StepperComponent,
    ShortenPipe1
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModulesPro.forRoot(),
    TeacherRoutingModule
  ],
  providers: [ RegisterToeflService, MakeExamService, ExecutableCommandService, ReadingService ]
})
export class ToeflTeacherModule {}

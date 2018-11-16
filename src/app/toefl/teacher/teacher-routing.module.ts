
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';
import { NotFoundComponent } from '../not-found/not-found.component';

import { RegisterToeflComponent } from './register-toefl.component';
import { RegisterToeflStartComponent } from './register-toefl/register-toefl-start/register-toefl-start.component';
import { RegistToeflDetailComponent } from './register-toefl/regist-toefl-exam/regist-toefl-detail/regist-toefl-detail.component';
import { RegistToeflEditComponent } from '../teacher/register-toefl/regist-toefl-exam/regist-toefl-edit/regist-toefl-edit.component';

import { MakeExamStartComponent } from './register-toefl/make-toefl-exam/make-exam-start/make-exam-start.component';

import { ReadingExamComponent } from './register-toefl/make-toefl-exam/reading-exam/reading-exam.component';
import { EditReadingDescComponent } from './register-toefl/make-toefl-exam/reading-exam/edit-reading-desc/edit-reading-desc.component';
import { ReadingSection1Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section1/reading-section1.component';
import { ReadingSection2Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section2/reading-section2.component';
import { ReadingSection3Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section3/reading-section3.component';
import { ReadingSection4Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section4/reading-section4.component';

import { ListeningExamComponent } from './register-toefl/make-toefl-exam/listening-exam/listening-exam.component';

const teacherRoutes: Routes = [
  { path: 'teacher', component: RegisterToeflComponent, children: [
      { path: '', component: RegisterToeflStartComponent },
      { path: 'new', component: RegistToeflEditComponent},       // 만일 순서를 지키지 않으면 params 에러가 발생할수 있음
      { path: ':id', component: RegistToeflDetailComponent },
      { path: ':id/edit', component: RegistToeflEditComponent},

      { path: ':id/makeexam', component: MakeExamStartComponent},

      { path: ':id/editReadingDesc', component: EditReadingDescComponent},
      { path: ':id/makeexam/reading', component: ReadingExamComponent},
      { path: ':id/makeexam/readingSection1', component: ReadingSection1Component},
      { path: ':id/makeexam/readingSection2', component: ReadingSection2Component},
      { path: ':id/makeexam/readingSection3', component: ReadingSection3Component},
      { path: ':id/makeexam/readingSection4', component: ReadingSection4Component}


      // { path: 'registertoefl', component: RegisterToeflComponent, canActivate: [AuthGuard] }
  ]
}
];

@NgModule({
  imports: [
            RouterModule.forChild(teacherRoutes)
  ],
  exports: [RouterModule],
  providers: [ AuthGuard ],

})
export class TeacherRoutingModule {}


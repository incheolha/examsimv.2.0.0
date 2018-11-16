import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { NotFoundComponent } from './toefl/not-found/not-found.component';

const APP_ROUTES: Routes = [
   { path: '', component: WelcomeComponent  },
   // { path: 'teacher', loadChildren: './toefl/teacher/teacher.module#ToeflTeacherModule'},
    // { path: 'toeflexam', loadChildren: './toefl/toeflExam/toeflexam.module#ToeflExamModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';


import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { AuthRoutingModule } from './auth-routing.module';
import { ToastModule } from 'ng-uikit-pro-standard';
import { SharedModule } from './../shared/shared.module';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileOrderHistoryComponent } from './profile/profile-edit/profile-order-history/profile-order-history.component';
import { EditUserProfileComponent } from './profile/profile-edit/edit-user-profile/edit-user-profile.component';
import { ExamHistoryComponent } from './profile/profile-edit/exam-history/exam-history.component';
import { ExamAnalysisComponent } from './profile/profile-edit/exam-analysis/exam-analysis.component';
import { PurchasedHistoryComponent } from './profile/purchased-history/purchased-history.component';

@NgModule({
  declarations: [
                  AuthenticationComponent,
                  LoginComponent,
                  LogoutComponent,
                  SignupComponent,
                  ProfileEditComponent,
                  ProfileOrderHistoryComponent,
                  EditUserProfileComponent,
                  ExamHistoryComponent,
                  ExamAnalysisComponent,
                  PurchasedHistoryComponent,

                ],
  imports: [
            CommonModule,
            SharedModule,
            MDBBootstrapModulesPro.forRoot(),
            ToastModule.forRoot(),
            AuthRoutingModule
  ]
})
export class AuthModule {}

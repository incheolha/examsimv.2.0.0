
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { MatDialogModule } from '@angular/material';

import { ToastrModule } from 'ngx-toastr';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { AuthService } from './auth/auth.service';
import { UtilityService } from './Utility-shared/utility.service';
import { SharedModule } from './shared/shared.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { ToeflTeacherModule } from './toefl/teacher/teacher.module';
import { ToeflExamModule } from './toefl/toeflExam/toeflexam.module';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';

import { NotFoundComponent } from './toefl/not-found/not-found.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { PaymentModule} from './payment/payment.module';

import { ToeflListComponent } from './toefl/toeflExam/toefl-list/toefl-list.component';
import { BasicToeflListComponent } from './toefl/toeflExam/basic-toefl-list/basic-toefl-list.component';
import { IntermediateToeflListComponent } from './toefl/toeflExam/intermediate-toefl-list/intermediate-toefl-list.component';
import { AdvanceToeflListComponent } from './toefl/toeflExam/advance-toefl-list/advance-toefl-list.component';
import { BeginnerToeflListComponent } from './toefl/toeflExam/beginner-toefl-list/beginner-toefl-list.component';
import { EventToeflListComponent } from './toefl/toeflExam/event-toefl-list/event-toefl-list.component';
import { ShortenPipe } from './shared/pipe-collection/shorten.pipe';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    NotFoundComponent,
    ToeflListComponent,
    BeginnerToeflListComponent,
    BasicToeflListComponent,
    IntermediateToeflListComponent,
    AdvanceToeflListComponent,
    FooterComponent,
    EventToeflListComponent,
    ShortenPipe,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AuthModule,
    ToeflTeacherModule,
    ToeflExamModule,
    AppRoutingModule,
    SharedModule,
    PaymentModule,
    ToastrModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    MatDialogModule
   ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    MDBSpinningPreloader, AuthService, UtilityService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }

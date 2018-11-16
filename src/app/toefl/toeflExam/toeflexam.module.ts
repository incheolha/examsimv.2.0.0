
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToeflExamRoutingModule } from './toefl-routing.module';

import { ToeflExamComponent } from './toefl-exam.component';

import { SharedModule } from '../../shared/shared.module';

import { ToeflExamService } from './toeflexam.service';

@NgModule({
  declarations: [
    ToeflExamComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    ToeflExamRoutingModule
  ],
  providers: [ ToeflExamService ]
})
export class ToeflExamModule {}

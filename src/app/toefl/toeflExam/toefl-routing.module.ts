
import { NgModule } from '@angular/core';

import { Routes, RouterModule, CanActivate } from '@angular/router';

import { ToeflListComponent } from './toefl-list/toefl-list.component';

import { ToeflExamComponent } from './toefl-exam.component';

export const toeflExamRoutes: Routes = [
 { path: 'toeflexam', component: ToeflExamComponent, children: [

 ]}
];

@NgModule({
  imports: [RouterModule.forChild(toeflExamRoutes)],
  exports: [RouterModule]
})
export class ToeflExamRoutingModule {}


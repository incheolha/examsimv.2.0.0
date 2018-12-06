import { ModalDirective } from 'ng-uikit-pro-standard';
import { Component, Inject, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements AfterViewInit {

  @ViewChild('basicModal') basicModal: ModalDirective;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, title: string}) {}

  ngAfterViewInit(): void {
    this.basicModal.show();
  }
}

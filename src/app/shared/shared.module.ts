
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// For MDB Angular Pro
import { WavesModule, PreloadersModule, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR } from 'ng-uikit-pro-standard'
// For MDB Angular Pro
import { ModalModule, InputsModule } from 'ng-uikit-pro-standard'

@NgModule({

  exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      WavesModule,
      PreloadersModule,
      ModalModule,
      InputsModule
  ],

})
export class SharedModule {}

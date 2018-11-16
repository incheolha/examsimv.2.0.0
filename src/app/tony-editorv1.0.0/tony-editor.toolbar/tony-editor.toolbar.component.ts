import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Symbol } from '../GlobalSetting/tony-editor.global.default';
import { CommandModel } from '../GlobalSetting/command.model';


import { ExecutableCommandService } from '../services/executable-command.service';
import * as Utils from '../Utility/tony-editor.utility';

@Component({
  selector: 'app-tony-editor-toolbar',
  templateUrl: './tony-editor.toolbar.component.html',
  styleUrls: ['./tony-editor.toolbar.component.scss'],

})
export class TonyEditorToolbarComponent implements OnInit {

  command: CommandModel;
  checkBackColor = true;

  @Input() config: any;
  @Output() execute: EventEmitter<CommandModel> = new EventEmitter<CommandModel>();

  constructor(private executableCommandService: ExecutableCommandService) { }

  ngOnInit() {
  }
  canEnableToolbarOptions(value): boolean {

    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  onSymbolInsert(option: number) {
    console.log(' ■ Symbol Insert');
    switch (option) {
      case 0: this.triggerCommand('insertText', Symbol.squareSymbol);
      break;
      case 1: this.triggerCommand('insertText', Symbol.triangleSymbol);
      break;
      case 2: this.triggerCommand('insertText', Symbol.oneSymbol);
      break;
      case 3: this.triggerCommand('insertText', Symbol.twoSymbol);
      break;
      case 4: this.triggerCommand('insertText', Symbol.threeSymbol);
      break;
      case 5: this.triggerCommand('insertText', Symbol.fourSymbol);
      break;
    }
  }

  onBackColorChange() {
    if (this.checkBackColor) {
      this.triggerCommand('backcolor', '#80cbc4');
      this.checkBackColor = false;
    } else {
      this.triggerCommand('backcolor', 'white');
      this.checkBackColor = true;
    }
  }

  triggerCommand(command:  string, value): void {
    this.command = new CommandModel(command, value);
    console.log(this.command);
    this.execute.emit(this.command);
  }
}

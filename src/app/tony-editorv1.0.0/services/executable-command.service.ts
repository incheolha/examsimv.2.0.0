import { Injectable } from '@angular/core';
import * as Utils from '../Utility/tony-editor.utility';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExecutableCommandService {

    // text area내 벗어나면 blur 기능을 수행하고 곧바로 작업한 내용을 저장하기위한 용도

    public htmlContent = new Subject<string>();

    savedSelection: any = undefined;

    execute(command: string, value: string): void {
        console.log(command);
        console.log(value);
        if (!this.savedSelection && command !== 'enableObjectResizing') {
            throw new Error('Range OUt of Editor');
        }
        if (command === 'enableObjectResizing') {
            document.execCommand('enableObjectResizing', true, true);
        }
        if (command === 'blockquote') {
            document.execCommand('formatBlock', false, 'blockquote');
            return;
        }
        if (command === 'removeBlockquote') {
            document.execCommand('formatBlock', false, 'div');
            return;
        }
        if (command !== undefined) {
            console.log(value);
            document.execCommand(command, false, value);
        } else {
            console.log('this is check point');
            document.execCommand(command, false, null);
        }

        return;
    }

}

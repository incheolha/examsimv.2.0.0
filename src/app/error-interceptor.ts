import { UtilityService } from './Utility-shared/utility.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor,
         HttpHandler,
         HttpRequest,
         HttpErrorResponse} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An Unkwown error occurred';
        let errorTitle = 'An Unkown Error Title';
        if (error.error.message) {
          errorMessage = error.error.message;
          errorTitle = error.error.title;
        }

        this.dialog.open( ErrorComponent, {data: { message: errorMessage, title: errorTitle}});
       // this.utilityServices.errorToast(errorTitle, errorMessage);
        return throwError(error);
      })
    );
  }
}

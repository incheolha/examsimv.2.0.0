import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Reading } from './../../../../models/reading.model';
import 'rxjs/add/observable/throw';

import { UtilityService } from '../../../../../Utility-shared/utility.service';

@Injectable()
export class ReadingService {

  reading: Reading;
  constructor(private http: Http,
              private utilityService: UtilityService) {}


  getReadingSection(toeflNo: number) {

    const token = localStorage.getItem('token');
    this.utilityService.loadingStateChanged.next(true);

    return this.http.get('http://localhost:3000/reading/' + toeflNo + '?token=' + token )
                    .map((res: Response) => {
                     const data = res.json();
                     console.log(data);
                    this.utilityService.loadingStateChanged.next(false);
                    return data;
                    })
                    .catch((error: Response) => this.handleError(error));
  }

  addReadingSection(reading: Reading) {
    const token = localStorage.getItem('token');

    const body = JSON.stringify(reading);

    console.log(body);
    const header = new Headers({'Content-Type': 'application/json'});
    this.utilityService.loadingStateChanged.next(true);
    return this.http.post('http://localhost:3000/reading' + '?token=' + token, body, {headers : header} )
                          .map((res: Response) => {
                            const data = res.json();
                            console.log(data);
                            this.utilityService.loadingStateChanged.next(false);
                            return data;
                          })
                          .catch((error: Response) => this.handleError(error));
  }

  updateReadingSection(reading: Reading) {
    const token = localStorage.getItem('token');
    const body = JSON.stringify(reading);
    console.log('Update Mode : ' +body);
    const header = new Headers({'Content-Type': 'application/json'});
    this.utilityService.loadingStateChanged.next(true);
    return this.http.patch('http://localhost:3000/reading' + '?token=' + token, body, {headers : header} )
                          .map((res: Response) => {
                            const data = res.json();
                            console.log(data);
                            this.utilityService.loadingStateChanged.next(false);
                            return data;
                          })
                          .catch((error: Response) => this.handleError(error));
  }

  public handleError(error: Response) {
    const err = error.json();
    this.utilityService.loadingStateChanged.next(false);
    this.utilityService.errorToast(err.title, err.message);
    return Observable.throw(err);
  }
}

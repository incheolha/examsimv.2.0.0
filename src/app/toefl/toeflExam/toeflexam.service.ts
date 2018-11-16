import { Toefl } from './../models/toefl.model';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService} from '../../auth/auth.service';

import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ToeflExamService {

  loginStatusChecked = false;

  private toefls: Toefl[] = [];
  public toeflListChanged = new Subject<Toefl[]>();
  public toeflListChanged1 = new Subject<Toefl[]>();
  constructor(private http: Http,
              private http1: HttpClient)  {}

  getAllToeflLists1() {

   this.http.get('http://localhost:3000/showExam/')
                  .subscribe(
                    (res: Response) => {
                          console.log(res);
                          const data = res.json();
                          console.log(data);
                          this.toefls.splice(0);
                          for (const toeflItem of data.toefls) {
                                this.toefls.push(toeflItem);
                          }
                    console.log(this.toefls.slice());
                    this.toeflListChanged1.next(this.toefls.slice());
                  },
                  (error) => console.log(error)
                );

  }

  getAllToeflLists() {
    this.http1.get<{message: string, toefls: Toefl[]}>('http://localhost:3000/showExam/')
              .subscribe((postToefls) => {
                  this.toefls = postToefls.toefls;
                  this.toeflListChanged.next([...this.toefls]);
    });
  }
}



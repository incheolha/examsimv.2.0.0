
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';

import { UtilityService } from './../Utility-shared/utility.service';
import { MainNavModel } from './../Utility-shared/mainNavChange.model';
import { User } from './user.model';

import { Shoppingcart } from '../payment/model/shoppingcart.model';
import { PaidToeflList } from '../payment/model/paidToeflLists.model';
import { ProfileInfo } from './profile.model';

@Injectable()
export class AuthService {

  authChange = new Subject<boolean>();
  teacherAuth = new Subject<boolean>();
  mainNavModel: MainNavModel;

  profileInfo: ProfileInfo;

  clearPaidToeflLists: PaidToeflList[] = [];     // logout으로 인한 인증취소시 모든 PaidToeflList[]를 초기화 시킨다
  clearShoppingCartLists: Shoppingcart[] = [];
  clearProfileInfoPassed: ProfileInfo = null;
  isAuthenticated = false;
  isteacherAuthenticated = false;

  public shoppingCartLists = new Subject<Shoppingcart[]>();
  public paidToeflLists = new Subject<PaidToeflList[]>();

  constructor(private http: Http,
              private router: Router,
              private utilityService: UtilityService) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    this.utilityService.loadingStateChanged.next(true);
    return this.http.post('http://localhost:3000/user/signup', body, {headers: headers})
                    .map((response: Response) => {
                                                  const result = response.json();
                                                  localStorage.setItem('token', result.token);
                                                  localStorage.setItem('userId', result.userId);
                                                  localStorage.setItem('userName', result.userName);
                                                  localStorage.setItem('userEmail', result.userEmail);

                                                  this.authSuccess(result.permissionTag);
                                                  this.utilityService.loadingStateChanged.next(false);

                                                  this.shoppingCartLists.next(result.shoppingCartLists);
                                                  this.paidToeflLists.next(result.paidToeflLists);

                                                  return result;
                    })
                     .catch((error: Response) => this.handleError(error));
  }

  login(user: User) {
    this.utilityService.loadingStateChanged.next(true);
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    this.utilityService.loadingStateChanged.next(true);
    return this.http.post('http://localhost:3000/user/login', body, {headers: headers})
                    .map((response: Response) => {
                                                  const result = response.json();
                                                  console.log(result);
                                                  localStorage.setItem('token', result.token);
                                                  localStorage.setItem('userId', result.userId);
                                                  localStorage.setItem('userName', result.userName);
                                                  localStorage.setItem('userEmail', result.userEmail);

                                                  this.authSuccess(result.permissionTag);
                                                  this.utilityService.loadingStateChanged.next(false);
                                                 this.shoppingCartLists.next(result.shoppingCartLists);
                                                 this.paidToeflLists.next(result.paidToeflLists);
                                                 return result;
                    })
                  .catch((error: Response) => this.handleError(error));
  }

  private handleError(error: Response) {
    const err = error.json();
    this.utilityService.loadingStateChanged.next(false);
    this.utilityService.errorToast(err.title, err.message);
    return Observable.throw(err);
  }

  private authSuccess(teacherAuth: string) {
    this.authChange.next(true);
    console.log(this.authChange);

        if (localStorage.getItem('token') !== null) {
            this.isAuthenticated = true;
        }
        if (teacherAuth === 'teacher') {
          this.teacherAuth.next(true);
          this.isteacherAuthenticated = true;

        } else {
          this.teacherAuth.next(false);
          this.isteacherAuthenticated = false;
        }
        this.router.navigate(['/']);
  }

  logout() {
    localStorage.clear();
    this.authChange.next(false);                             // 사용자 인증 logout
    this.teacherAuth.next(false);                            // teacher permission 초기화
    this.isAuthenticated = false;                            // 일반 사용자 인증취소
    this.isteacherAuthenticated = false;                           // 관리자 선생님 인증 취소
    this.paidToeflLists.next(this.clearPaidToeflLists);            // paid ToeflList 초기화
    this.shoppingCartLists.next(this.clearShoppingCartLists);      // shopping cart list 초기화
    this.mainNavModel = new MainNavModel(false, true);             // 인증 clear
    this.utilityService.mainNavChanged.next(this.mainNavModel);    // main 화면 navigation활성화
    this.router.navigate(['/']);                                   // 인증이 안되 main 홈페이지 화면으로 돌아감
  }

  isAuth() {                                                       // welcome component에서 인증모드롤 각 tab에 injection하기위해사용
      console.log(this.isAuthenticated);
      return this.isAuthenticated;
  }

  isTecherAuth() {                                                 // welcome component에서 teacher인증여부를 각 tabl에 injection하여
    return this.isteacherAuthenticated;                            // 선생님 관리자 모드인 경우 장바구니버튼과 purchase버튼을 보여주지 않을목적으로 설정됨
  }

  getProfileInfo() {
    console.log('get Info Profile check');
    this.profileInfo = new ProfileInfo(localStorage.getItem('userEmail'), localStorage.getItem('userName'));
    return this.profileInfo;
}

}

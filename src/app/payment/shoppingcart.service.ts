import { PaypalPaymentService } from './paymentAgency-Service/paypal-payment.service';
import { PaidToeflList } from './model/paidToeflLists.model';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

import { User } from '../auth/user.model';
import { Payment } from './model/payment.model';
import { Shoppingcart } from './model/shoppingcart.model';

import { Toefl } from '../toefl/models/toefl.model';

import { AuthService } from '../auth/auth.service';

import { UtilityService } from '../Utility-shared/utility.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { Subscription } from 'rxjs/Subscription';

@Injectable()

export class ShoppingcartService {


    shoppingCartLists: Shoppingcart[] = [];
    paidToeflLists: PaidToeflList[] = [];                              // 실제 shopping item을 저장하는 공간
    shoppingCartListAdded = new Subject<Shoppingcart[]>();
    paidToeflListAdded = new Subject<PaidToeflList[]>();
    currentCart: Shoppingcart;

    paypalCheck = false;

    paidToeflListSubscription: Subscription;
    serverCartListSubscription: Subscription;

    constructor (
        private http: Http,
        private router: Router,
        private authService: AuthService,
        private utilityService: UtilityService) {}


// 사용자가 인증을 하였을시 자동으로 이 method를 이용하여 User에 저장된 shoppingCartList를 가저온다
connectAuthShoppingCart() {
      this.serverCartListSubscription = this.authService.shoppingCartLists.subscribe((shoppingcart: Shoppingcart[]) => {
                                          this.shoppingCartLists = shoppingcart;
                                          this.shoppingCartListAdded.next(this.shoppingCartLists);  // header에 있는 shopping list에 보냄
      });

      this.paidToeflListSubscription = this.authService.paidToeflLists.subscribe((paidToeflLists: PaidToeflList[]) => {
                                          this.paidToeflLists = paidToeflLists;
                                          this.paidToeflListAdded.next(this.paidToeflLists);
      });
}

// 사용자가 로그인이 완료된 시점에서만 작동하며 welcome.component->tabset->장바구니를 클릭하였을시 작동됨
  addShoppingCartList(newShoppingCartItem: Shoppingcart) {

      const findShoppingItem = this.shoppingCartLists.filter( (shoppingCart: Shoppingcart) => {
                               return shoppingCart.examNo === newShoppingCartItem.examNo;
                               } );

      if (findShoppingItem.length === 0) {
        console.log('new item listed on Shoppingcart.');
        this.shoppingCartLists.push(newShoppingCartItem);
        console.log(this.shoppingCartLists);
        this.utilityService.successToast( '선택하신 회차가 장바구니에 담겼습니다.', '공지사항');
        this.shoppingCartListAdded.next(this.shoppingCartLists);                           // header에 있는 shopping list에 보냄
      } else {
        this.utilityService.errorToast('선택하신 회차가 이미 장바구니에 있습니다.', '에러공지');
      }

  }

  // header.component에서 cart 지우기를 눌렀을때 사용
      shoppingCartItemRemoved(shoppingCartItem: Shoppingcart) {

          const findItemNumber = this.shoppingCartLists.indexOf(shoppingCartItem);
          this.shoppingCartLists.splice(findItemNumber, 1);                                // shopping item 제거
          this.shoppingCartListAdded.next(this.shoppingCartLists);                         // update된 shopping list를 header로 보냄
      }

  // payPal and Stripe 결재후 shoppingcartlist와 paidToeflLists를 updated하는 모드
      reInitialShoppingCartLists(paidToeflLists) {
              console.log(paidToeflLists);
              this.shoppingCartLists = [];
              this.paidToeflLists = paidToeflLists;
              this.shoppingCartListAdded.next(this.shoppingCartLists);
              this.paidToeflListAdded.next(paidToeflLists);
              return true;
      }

      getShoppingCartLists() {
        return this.shoppingCartLists;
      }

      getPaidToefltLists() {
        console.log(this.paidToeflLists);
        return this.paidToeflLists;
      }

      goCheckOut() {
        this.router.navigate(['/payment/shoppingcart']);
      }

      goSave() {
        const token = localStorage.getItem('token');
        const body = JSON.stringify(this.shoppingCartLists);

        const header = new Headers({'Content-type': 'application/json'});

        this.http.post('http://localhost:3000/shoppingcart/' + '?token=' + token, body, {headers: header})
                 .subscribe(
                              (res: Response) => {
                                  console.log(res);
                                  const data = res.json();
                                  console.log(data.result);
                                  this.shoppingCartLists = [];
                                  this.shoppingCartLists = data.result;
                                  this.shoppingCartListAdded.next(this.shoppingCartLists);   // shopping cart 추가후 변화한 값 적용하기
                              },
                              (error) => console.log(error)
                          );

      }
}


import { PaidToeflList } from './../model/paidToeflLists.model';
import { Injectable, OnInit} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { StripeModel } from '../model/stripeModel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { Subject } from 'rxjs/Subject';
import { Shoppingcart } from '../model/shoppingcart.model';
import { UtilityService } from '../../Utility-shared/utility.service';
import { ShoppingcartService } from '../shoppingcart.service';
import { Router } from '@angular/router';

@Injectable()
export class StripePaymentService {


  shoppingCartLists = new Subject<Shoppingcart[]>();
  paidToeflLists = new Subject<PaidToeflList[]>();
    constructor(private http: Http,
                private router: Router,
                private shoppingCartService: ShoppingcartService,
                private utilityService: UtilityService) {}

  gotoStripeCharge(stripeCardInfo: StripeModel) {
        const body = JSON.stringify(stripeCardInfo);
        const header = new Headers({'Content-Type': 'application/json'});

      return this.http.post('http://localhost:3000/stripepayment', body, {headers: header})
            .subscribe((res: Response) => {
                const data = res.json();

                this.utilityService.successToast('결제가 성공적으로 완료되었습니다. 감사합니다', '결제 공지사항');
                const reInitSuccess = this.shoppingCartService.reInitialShoppingCartLists(data.paidToeflLists);
                if (reInitSuccess) {
                  this.router.navigate(['/']);
                }
            },
            (error) => console.error(error)
          );

    }
}

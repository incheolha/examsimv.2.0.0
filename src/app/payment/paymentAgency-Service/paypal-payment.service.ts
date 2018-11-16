import { ShoppingcartService } from './../shoppingcart.service';
import { Payment } from './../model/payment.model';
import { Injectable, OnInit} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PaypalPaymentService {

    payment: Payment;

    constructor(private http: Http,
                private shoppingCartService: ShoppingcartService) {}


    checkoutPaypal(payment: Payment) {

      console.log('paypal click');

        const body = JSON.stringify(payment);

        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/paypal/createPayment', body, {headers: headers})
                        .subscribe(data => {
                            const paymentUrl = data.json();
                            console.log(paymentUrl.url);
                            window.location.href = paymentUrl.url;
                        }),
                        (error) => this.handleErrors(error);
    }

    getPaypalResult() {
        const token = localStorage.getItem('token');
        const header = new Headers({'Content-type': 'application/json'});
        return this.http.get('http://localhost:3000/paypal/paymentResult/' + '?token=' + token, {headers: header})
                    .subscribe(
                        (res: Response) => {
                            const data = res.json();
                            const reInitSuccess = this.shoppingCartService.reInitialShoppingCartLists(data.payPalResult);
                        }
                    );
    }

    handleErrors(error: Response) {
        const err = error.json();
        console.log(err);
        return Observable.throw(error);
    }
}

import { UtilityService } from './../../../Utility-shared/utility.service';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';

import { Payment } from '../../model/payment.model';
import { StripeModel } from '../../model/stripeModel';

import { ShoppingcartService } from '../../shoppingcart.service';
import { PaypalPaymentService } from '../../paymentAgency-Service/paypal-payment.service';
import { StripePaymentService } from '../../paymentAgency-Service/stripe-payment.service';
import { Shoppingcart } from '../../model/shoppingcart.model';

import { MainNavModel } from './../../../Utility-shared/mainNavChange.model';
import { PaidToeflList } from '../../model/paidToeflLists.model';

@Component({
  selector: 'app-payment-proceed',
  templateUrl: './payment-proceed.component.html',
  styleUrls: ['./payment-proceed.component.scss']
})
export class PaymentProceedComponent implements OnInit {

  userToken: string;
  totalAmount = 0;
  payment: Payment;
  shoppingCartLists: Shoppingcart[];
  paidToeflLists: PaidToeflList[];

  // Stripe payment를 위한 변수선언.

  stripeInfo: StripeModel;
  cardNumber: StripeElement;
  cardExpiry: StripeElement;
  cardCvc: StripeElement;
  card: StripeElement;
  elements: Elements;

  elementOptions: ElementsOptions = {
    locale: 'auto'
  };

  // credit card information input form for stripe

  stripeForm: FormGroup;

  stripeCheckbox = false;
  stripeisActive = false;
  paypalCheckbox = false;
  paypalisActive = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private utilityService: UtilityService,
              private shoppingcartService: ShoppingcartService,
              private paypalPaymentService: PaypalPaymentService,
              private stripePaymentService: StripePaymentService,
              private stripeService: StripeService) {}

  ngOnInit() {

          this.userToken = localStorage.getItem('token');
          this.route.params.subscribe((params: Params) => {
                                                            this.totalAmount = +params['totalAmount'];
                                                            console.log(this.totalAmount);
          this.shoppingCartLists = this.shoppingcartService.getShoppingCartLists();
                                                            });

    this.stripeForm = this.fb.group({
      cardHolderName: ['', [Validators.required]],
      cardHolderEmail: ['', [Validators.required]],
      cardHolderZip: ['', [Validators.required]]
    });

    this.stripeService.elements(this.elementOptions)
               .subscribe(elements => {
                 this.elements = elements;
                            if (!this.cardNumber) {
                              this.cardNumber = this.elements.create('cardNumber', {});

                              this.cardNumber.mount('#card-number');
                            }

                            if (!this.cardExpiry) {
                              this.cardExpiry = this.elements.create('cardExpiry', {});
                              this.cardExpiry.mount('#card-expiry');
                            }

                            if (!this.cardCvc) {
                              this.cardCvc = this.elements.create('cardCvc', {});
                              this.cardCvc.mount('#card-cvc');
                            }
                });

  }

  onStripeSubmit() {

    this.stripeService
                      .createToken(this.cardNumber, {name})
                      .subscribe(result => {
                                if ( result.token ) {
                                  const stripeToken = result.token.id;
                                  this.stripeInfo = new StripeModel(
                                                      this.stripeForm.value.cardHolderName,
                                                      this.stripeForm.value.cardHolderEmail,
                                                      this.stripeForm.value.cardHolderZip,
                                                      stripeToken,
                                                      this.userToken,
                                                      this.shoppingCartLists,
                                                      this.totalAmount * 100
                                                    );
                                  this.stripePaymentService.gotoStripeCharge(this.stripeInfo);
                                } else if ( result.error) {
                                  console.log(result.error.message);
                                  this.utilityService.errorToast(result.error.message, 'Credit Card Payment Error');
                                }
                      });
  }

  onPaypalSubmit() {
    console.log('paypal click');
    console.log(this.totalAmount);
    this.payment = new Payment(this.userToken, this.shoppingCartLists, this.totalAmount);

    this.paypalPaymentService.checkoutPaypal(this.payment);
  }


  activeStripe() {
   console.log(this.stripeCheckbox);
             if (this.stripeCheckbox) {
               this.stripeisActive = false;
               this.stripeCheckbox = false;
             } else if (!this.stripeCheckbox) {
               this.stripeCheckbox = true;
               this.stripeisActive = true;
             }

  }

  activePaypal() {
    console.log(this.paypalCheckbox);
              if (this.paypalCheckbox) {
                this.paypalCheckbox = false;
                this.paypalisActive = false;
              } else if (!this.paypalCheckbox) {
                this.paypalCheckbox = true;
                this.paypalisActive = true;
              }
            }
}


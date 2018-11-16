import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-order-summary',
  templateUrl: './payment-order-summary.component.html',
  styleUrls: ['./payment-order-summary.component.scss']
})
export class PaymentOrderSummaryComponent {

  checkShoppingCart = false;

  @Input() totalAmount: number;

  constructor(private location: Location,
              private router: Router) {}

  goCancel() {
    this.router.navigate(['/']);
  }
  getPromoCode() {
    console.log('promo click');
  }


}

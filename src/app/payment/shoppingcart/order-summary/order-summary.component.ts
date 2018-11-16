import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {

  @Input() totalAmount: number;

  constructor(private location: Location,
              private router: Router) { }



  onCheckOut() {
    console.log('check out clicked');
    this.router.navigate(['/payment/checkout', this.totalAmount]);
  }

  goCancel() {
    this.location.back();
  }
  getPromoCode() {
    console.log('promo click');
  }


}

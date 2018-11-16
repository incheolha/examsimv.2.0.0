import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainNavModel } from './../../../Utility-shared/mainNavChange.model';
import { UtilityService } from '../../../Utility-shared/utility.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { PaypalPaymentService } from '../../paymentAgency-Service/paypal-payment.service';

@Component({
  selector: 'app-payment-notification',
  templateUrl: './payment-notification.component.html',
  styleUrls: ['./payment-notification.component.scss']
})
export class PaymentNotificationComponent implements OnInit, AfterViewInit {

  mainNavModel: MainNavModel;

  constructor(private utilityService: UtilityService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private payPalService: PaypalPaymentService
            ) { }

  ngOnInit() {
    console.log('this is a init result page');
        this.mainNavModel = new MainNavModel(false, false, false);
        this.utilityService.mainNavChanged.next(this.mainNavModel);    // main 화면 navigation활성화
        this.authService.authChange.next(true);                         // header component에 영향을 주는 authChange값
        this.authService.isAuthenticated = true;
        this.router.navigate(['/']);
        this.payPalService.getPaypalResult();

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.utilityService.successToast('PayPal 결제가 완료되었습니다. 감사합니다', 'PayPal 결제완료 공지사항');
    }, 0);

  }
}

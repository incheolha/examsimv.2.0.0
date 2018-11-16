import { NgModule } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

//  shopping cart routing은 한 페이지로 구성되있으므로 payment routing에
//  종속시킨다.

import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from '../shared/shared.module';


import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { OrderSummaryComponent } from './shoppingcart/order-summary/order-summary.component';
import { PaymentOrderSummaryComponent } from './payment-checkout/payment-order-summary/payment-order-summary.component';

import { PaymentComponent } from './payment.component';
import { PaymentProceedComponent } from './payment-checkout/payment-proceed/payment-proceed.component';
import { PaymentNotificationComponent } from './payment-checkout/payment-notification/payment-notification.component';

import { ShoppingcartService } from './shoppingcart.service';
import { PaypalPaymentService } from './paymentAgency-Service/paypal-payment.service';
import { StripePaymentService } from './paymentAgency-Service/stripe-payment.service';

import { NgxStripeModule} from 'ngx-stripe';





// For MDB Angular Pro


@NgModule({
    declarations: [
      PaymentComponent,
      ShoppingcartComponent,
      OrderSummaryComponent,
      PaymentProceedComponent,
      PaymentOrderSummaryComponent,
      PaymentNotificationComponent
    ],
    imports: [

        PaymentRoutingModule,
        SharedModule,
        NgxStripeModule.forRoot('pk_test_erzDoCmLOPEP1n4tLjvtT7Y2'),
        MDBBootstrapModulesPro.forRoot()

    ],
    providers : [ ShoppingcartService,
                  PaypalPaymentService,
                  StripePaymentService ]
})
export class PaymentModule {}

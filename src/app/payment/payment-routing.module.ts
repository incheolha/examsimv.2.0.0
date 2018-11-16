
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate} from '@angular/router';

import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { PaymentComponent } from './payment.component';
import { PaymentProceedComponent } from './payment-checkout/payment-proceed/payment-proceed.component';
import { PaymentNotificationComponent } from './payment-checkout/payment-notification/payment-notification.component';


export const paymentRoutes: Routes = [
    {
        path: 'payment', component: PaymentComponent, children: [
            {path: 'shoppingcart', component: ShoppingcartComponent},
            {path: 'checkout/:totalAmount', component: PaymentProceedComponent},
            {path: 'result', component: PaymentNotificationComponent}
        ]
    }

];


@NgModule({
    imports: [RouterModule.forChild(paymentRoutes)],
    exports: [RouterModule]
})
export class PaymentRoutingModule { }

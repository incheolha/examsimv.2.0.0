import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../auth.service';
import { ShoppingcartService } from '../../../payment/shoppingcart.service';
import { PaidToeflList } from './../../../payment/model/paidToeflLists.model';
import { ProfileInfo } from './../../profile.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {


  itemsPerPage = 3;
  numberOfPaginators: number;
  paginators: Array<any> = [];

  currentDate = new Date();
  totalAmount = 0;

  profileInfo: ProfileInfo;

  userName: string;
  paidToeflLists: PaidToeflList[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private shoppingCartService: ShoppingcartService) { }

  ngOnInit() {

          this.profileInfo = this.authService.getProfileInfo();

          this.paidToeflLists = this.shoppingCartService.getPaidToefltLists();
                  console.log(this.paidToeflLists);
                  if ( this.paidToeflLists.length !== 0 ) {
                    for (const paidToeflitem of this.paidToeflLists) {
                      this.totalAmount += paidToeflitem.examPrice;
                    }
                    this.calculatePagenator(this.paidToeflLists);
                  }
  }

calculatePagenator(paidToeflists) {

      // 모든 Paid Toefl List명단에 관한 pagenator 산출
           if (paidToeflists.length % this.itemsPerPage === 0) {
            this.numberOfPaginators = Math.floor(paidToeflists.length / this.itemsPerPage);
            } else {
            this.numberOfPaginators = Math.floor(paidToeflists.length / this.itemsPerPage + 1);
           }

            for (let i = 1; i <= this.numberOfPaginators; i++) {
                  this.paginators.push(i);
            }
}

onReturn() {
  this.router.navigate(['/']);
}

}

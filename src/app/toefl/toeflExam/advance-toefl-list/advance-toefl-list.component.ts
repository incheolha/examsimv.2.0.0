import { Component, ViewChildren, QueryList, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

import { JoinPaidToefl } from '../../models/join-paidtoefl-toefl.model';

import { ShoppingcartService } from '../../../payment/shoppingcart.service';
import { Shoppingcart } from '../../../payment/model/shoppingcart.model';

import { GlobalConstantShare } from '../../../Utility-shared/globalConstantShare';
@Component({
  selector: 'app-advance-toefl-list',
  templateUrl: './advance-toefl-list.component.html',
  styleUrls: ['./advance-toefl-list.component.scss']
})
export class AdvanceToeflListComponent {

  @Input() isAuth: boolean;                           // 일반 사용자 인증점검
  @Input() isTeacherAuth: boolean;                    // teacher admin 인증점검

  @Input() toefls: JoinPaidToefl[];

  @Input() numberOfPaginators: number;
  @Input() paginators: Array<any>;

  price = GlobalConstantShare.price;

  @ViewChildren('pages') pages: QueryList<any>;
  itemsPerPage = 6;
  numberOfVisiblePaginators = 10;
  activePage = 1;
  firstVisibleIndex = 1;
  lastVisibleIndex: number = this.itemsPerPage;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;


  constructor(private shoppingcartService: ShoppingcartService,
              private router: Router,
              private ref: ElementRef) {}

    onShoppingcart(toefl: JoinPaidToefl) {

      console.log('장바구니 클릭');

          if ( this.isAuth ) {
                              const cart = new Shoppingcart(toefl.toeflNo, toefl.toeflLevel, this.price);
                                            this.shoppingcartService.addShoppingCartList(cart);
                              } else {
                                this.router.navigate(['/auth/login']);
          }
    }

    onDirectPayment(toefl: JoinPaidToefl) {
      console.log('장바구니 클릭' + toefl);
      console.log(this.isAuth);

        if ( this.isAuth ) {
              const cart = new Shoppingcart(toefl.toeflNo, toefl.toeflLevel, this.price);
              this.shoppingcartService.addShoppingCartList(cart);
        } else {
              this.router.navigate(['/auth/login']);
        }
    }


    onPurchasedDetail(toefl) {
      console.log('Purchased Detail has been clicked');
    }

    onTakeExam(toefl) {
      console.log('Take Action for exam has been clicked');
    }

    changePage(event: any) {
                          if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
                              this.activePage = +event.target.text;
                              this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
                              this.lastVisibleIndex = this.activePage * this.itemsPerPage;
                          }
    }
    nextPage(event: any) {
                          if (this.pages.last.nativeElement.classList.contains('active')) {
                              if ((this.numberOfPaginators - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
                                    this.firstVisiblePaginator += this.numberOfVisiblePaginators;
                                    this.lastVisiblePaginator += this.numberOfVisiblePaginators;
                              } else {
                                    this.firstVisiblePaginator += this.numberOfVisiblePaginators;
                                    this.lastVisiblePaginator = this.numberOfPaginators;
                              }
                          }

                          this.activePage += 1;
                          this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
                          this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }
    previousPage(event: any) {
                        if (this.pages.first.nativeElement.classList.contains('active')) {
                              if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators)  {
                                  this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
                                  this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
                              } else {
                                  this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
                                  this.lastVisiblePaginator -= (this.numberOfPaginators % this.numberOfVisiblePaginators);
                              }
                        }

                          this.activePage -= 1;
                          this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
                          this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }

    firstPage() {
                          this.activePage = 1;
                          this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
                          this.lastVisibleIndex = this.activePage * this.itemsPerPage;
                          this.firstVisiblePaginator = 0;
                          this.lastVisiblePaginator = this.numberOfVisiblePaginators;
    }
    lastPage() {
                        this.activePage = this.numberOfPaginators;
                        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
                        this.lastVisibleIndex = this.activePage * this.itemsPerPage;

                        if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
                            this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
                            this.lastVisiblePaginator = this.numberOfPaginators;
                        } else {
                            this.lastVisiblePaginator = this.numberOfPaginators;
                            this.firstVisiblePaginator = this.lastVisiblePaginator -
                                                          (this.numberOfPaginators % this.numberOfVisiblePaginators);
                        }
    }

}

import { Component, OnInit, ViewChildren, QueryList, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Toefl } from './../../models/toefl.model';
import { Shoppingcart } from '../../../payment/model/shoppingcart.model';
import { ShoppingcartService } from '../../../payment/shoppingcart.service';
import { JoinPaidToefl } from './../../models/join-paidtoefl-toefl.model';

import { GlobalConstantShare } from '../../../Utility-shared/globalConstantShare';

@Component({
  selector: 'app-toefl-list',
  templateUrl: './toefl-list.component.html',
  styleUrls: ['./toefl-list.component.scss']
})
export class ToeflListComponent {

  @Input() isAuth: boolean;
  @Input() isTeacherAuth: boolean;

  @Input() toefls: JoinPaidToefl[];

  @Input() numberOfPaginators: number;
  @Input() paginators: Array<any>;


  // tab 페이지 관련 변수설정 영역
    @ViewChildren('pages') pages: QueryList<any>;
    itemsPerPage = 6;
    numberOfVisiblePaginators = 10;

    activePage = 1;
    firstVisibleIndex = 1;
    lastVisibleIndex: number = this.itemsPerPage;
    firstVisiblePaginator = 0;
    lastVisiblePaginator = this.numberOfVisiblePaginators;

    // shopping cart내 toefl 가격 명시 global 변수: 10불기준
    price = GlobalConstantShare.price;

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

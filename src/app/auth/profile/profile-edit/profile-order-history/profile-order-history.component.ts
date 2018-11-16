import { Component, OnInit,  ViewChildren, QueryList, ElementRef, Input } from '@angular/core';
import { PaidToeflList } from './../../../../payment/model/paidToeflLists.model';

@Component({
  selector: 'app-profile-order-history',
  templateUrl: './profile-order-history.component.html',
  styleUrls: ['./profile-order-history.component.scss']
})
export class ProfileOrderHistoryComponent implements OnInit {

  @Input() paidToeflLists: PaidToeflList[];
  @Input() totalAmount: number;

  @Input() numberOfPaginators: number;
  @Input() paginators: Array<any> = [];

  // tab 페이지 관련 변수설정 영역
    @ViewChildren('pages') pages: QueryList<any>;
    itemsPerPage = 3;
    numberOfVisiblePaginators = 10;

    activePage = 1;
    firstVisibleIndex = 1;
    lastVisibleIndex: number = this.itemsPerPage;
    firstVisiblePaginator = 0;
    lastVisiblePaginator = this.numberOfVisiblePaginators;

  constructor(private ref: ElementRef) { }

  private sorted = false;
  ngOnInit() {}


  sortBy(by: string | any): void {

    this.paidToeflLists.sort((a: any, b: any) => {
          if (a[by] < b[by]) {
            return this.sorted ? 1 : -1;
          }
          if (a[by] > b[by]) {
            return this.sorted ? -1 : 1;
          }
          return 0;
    });

    this.sorted = !this.sorted;
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

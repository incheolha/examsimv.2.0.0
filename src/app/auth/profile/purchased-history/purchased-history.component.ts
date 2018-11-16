import { MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
import { Component, OnInit,  ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaidToeflList } from './../../../payment/model/paidToeflLists.model';
import { ShoppingcartService } from '../../../payment/shoppingcart.service';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-purchased-history',
  templateUrl: './purchased-history.component.html',
  styleUrls: ['./purchased-history.component.scss']
})
export class PurchasedHistoryComponent implements OnInit, AfterViewInit {

  paidToeflLists: PaidToeflList[];
  totalAmount: number;
  paidToeflListsSubscription: Subscription;

  // tab 페이지 관련 변수설정 영역

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'First', 'Last', 'Handle'];

  firstItemIndex;
  lastItemIndex;

  constructor(private shoppingCartService: ShoppingcartService,
              private router: Router,
              private tableService: MdbTableService,
              private cdRef: ChangeDetectorRef) { }

  private sorted = false;

  ngOnInit() {
    console.log('this is the purchased history');
    this.paidToeflLists = this.shoppingCartService.getPaidToefltLists();

    console.log(this.paidToeflLists);
    this.elements = this.paidToeflLists;
    this.tableService.setDataSource(this.elements);
    this.elements = this.tableService.getDataSource();
    this.previous = this.tableService.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(4);
    this.firstItemIndex = this.mdbTablePagination.firstItemIndex;
    this.lastItemIndex = this.mdbTablePagination.lastItemIndex;

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onReturn() {
              this.router.navigate(['/']);
  }
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

}

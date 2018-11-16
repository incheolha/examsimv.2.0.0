import { Component, OnInit } from '@angular/core';

import { Shoppingcart } from '../model/shoppingcart.model';

import { AuthService } from './../../auth/auth.service';
import { ShoppingcartService } from '../shoppingcart.service'

import {Subject} from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

    shoppingCartLists: Shoppingcart[] = [];
    shoppingCartListAdded = new Subject<Shoppingcart>();
    totalAmount = 0;


  constructor( private shoppingcartService: ShoppingcartService,
               private authService: AuthService) {}

  ngOnInit() {
          this.shoppingCartLists = this.shoppingcartService.getShoppingCartLists();
          console.log(this.shoppingCartLists);
          for ( const amount of this.shoppingCartLists) {
                this.totalAmount += amount.examPrice;
          }
  }

}

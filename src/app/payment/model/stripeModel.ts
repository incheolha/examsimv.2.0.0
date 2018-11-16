import { Shoppingcart } from './shoppingcart.model';
export class StripeModel {

    constructor( public cardHolderName?: string,
                 public cardHolderEmail?: string,
                 public cardHolderZip?: string,
                 public tokenId?: string,
                 public userToken?: string,
                 public shoppingCartLists?: Shoppingcart[],
                 public amount?: number,
                 public cardNumber?: string,
                 public cardExpiry?: string,
                 public cardCvc?: string)
                 { }
}

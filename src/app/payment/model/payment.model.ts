import { Shoppingcart } from './shoppingcart.model';

export class Payment {
    constructor(
                    public userToken?: string,
                    public shoppingCartLists?: Shoppingcart[],
                    public amount?: number) {}
}

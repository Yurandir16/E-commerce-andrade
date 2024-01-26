import { cart } from "../entities/cart";

export interface cartRepository{
    postProductsCart(id:number,user_id:string,product_id:number):Promise<cart|null|string>;
    viewCartProduct(uuid:string):Promise<any|null>;
    deleteCartProduct(id:number):Promise<string|null|boolean>;

}
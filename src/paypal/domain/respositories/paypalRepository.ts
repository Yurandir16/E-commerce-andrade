import { paypal } from "../entities/paypal";

export interface paypalRepository{
    createPaypal(id:number):Promise<any|null|boolean>;
}
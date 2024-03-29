import { paypal } from "../entities/paypal";

export interface paypalRepository{
    createPaypal(uuid:string):Promise<any|null|boolean>;
    viewPaypal(token:string):Promise<any|null|boolean>;
}
import { paypal } from "../domain/entities/paypal";
import { paypalRepository } from "../domain/respositories/paypalRepository";

export class viewPaypalUseCase {
   
    constructor(readonly PaypalRepo: paypalRepository){}
    async run(token:string){
        const paypal = await this.PaypalRepo.viewPaypal(token);
        if(!paypal){
            throw new Error("ALGO SALIO MAL CON PAYPAL")
        }
        return paypal;
    }
}    


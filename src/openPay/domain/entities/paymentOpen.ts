export class PaymentOpenPay{
    constructor(
        public id:number,
        public name:string,
        public phone:string,
        public card_number:string,
        public cvv:string,
        public expiration_month:string,
        public expiration_year:string,
        public user_id:number,
        public cart_id:number
    ){}
}
export class shoppingRe{
    constructor(
        public customer_id:string,
        public given_name:string,
        public surname:string,
        public email_address:string,
        public country_code:string,
        public address_line_1:string,
        public address_line_2:string,
        public admin_area_1:string,
        public admin_area_2:string,
        public postal_code:string,
        public currency_code:string,
        public amount:number,
        public create_time:string
    ){}
}
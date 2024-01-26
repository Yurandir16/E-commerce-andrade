export class productClient{
    constructor(
        public id:number,
        public namePart:string,
        public numberPart:string,
        public amount: number,
        public image:string,
        public description:string,
        public price:number,
        public conditions:string,
        public status:boolean
    ){ }
}
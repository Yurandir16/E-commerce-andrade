export class product{
    constructor(
        public id:number,
        public namePart:string,
        public numberPart:number,
        public amount: number,
        public image:string,
        public description:string,
        public price:number,
        public conditions:string,
        public status:boolean
    ){}
}
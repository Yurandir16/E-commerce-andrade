import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';


export class ValidatorCreateProduct{
    @IsNotEmpty()
    @IsNumber()
    public id:number;

    @IsNotEmpty()
    @IsString()
    public namePart:string;

    @IsNotEmpty()
    @IsNumber()
    public numberPart:number;

    @IsNotEmpty()
    @IsNumber()
    public amount: number;

    @IsNotEmpty()
    @IsString()
    public image:string;

    @IsNotEmpty()
    @IsString()
    public description:string;

    @IsNotEmpty()
    @IsNumber()
    public price:number;

    @IsNotEmpty()
    @IsString()
    public conditions:string;

    @IsNotEmpty()
    @IsBoolean()
    public status:boolean;
    
    constructor(
        id:number,
        namePart:string,
        numberPart:number,
        amount: number,
        image:string,
        description:string,
        price:number,
        conditions:string,
        status:boolean
    ){
        this.id=id;
        this.namePart=namePart;
        this.numberPart=numberPart;
        this.amount= amount;
        this.image=image;
        this.description=description;
        this.price=price;
        this.conditions=conditions;
        this.status=status;
    }

}


export class ValidatorUpdateProduct{
    @IsNotEmpty()
    @IsNumber()
    public id:number;

    @IsNotEmpty()
    @IsString()
    public namePart:string;

    @IsNotEmpty()
    @IsNumber()
    public numberPart:number;

    @IsNotEmpty()
    @IsNumber()
    public amount: number;

    @IsNotEmpty()
    @IsString()
    public image:string;

    @IsNotEmpty()
    @IsString()
    public description:string;

    @IsNotEmpty()
    @IsNumber()
    public price:number;

    @IsNotEmpty()
    @IsString()
    public conditions:string;

    @IsNotEmpty()
    @IsBoolean()
    public status:boolean;
    
    constructor(
        id:number,
        namePart:string,
        numberPart:number,
        amount: number,
        image:string,
        description:string,
        price:number,
        conditions:string,
        status:boolean
    ){
        this.id=id;
        this.namePart=namePart;
        this.numberPart=numberPart;
        this.amount= amount;
        this.image=image;
        this.description=description;
        this.price=price;
        this.conditions=conditions;
        this.status=status;
    }

}

export class ValidatorDeleteProduct{
    @IsNotEmpty()
    @IsNumber()
    public id:number;

    constructor(
        id:number
    ){
        this.id=id
    }
}

export class validatorViewUserShop{
    @IsNotEmpty()
    @IsString()
    public customer_id:string;

    constructor(
        customer_id:string
    ){
        this.customer_id=customer_id
    }
}


export class validatorImage{
    @IsNotEmpty()
    @IsString()
    public image:string;

    constructor(
        image:string
    ){
        this.image=image;
    }
}
export class ValidatorInactivateProduct{
    @IsNotEmpty()
    @IsNumber()
    public id:number;

    @IsNotEmpty()
    @IsBoolean()
    public status:boolean;

    constructor(
        id:number,
        status:boolean
    ){
        this.id=id,
        this.status=status;
    }
}
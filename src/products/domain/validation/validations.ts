import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';


export class ValidatorCreateProduct{

    @IsNotEmpty()
    @IsString()
    public model:string;

    @IsNotEmpty()
    @IsString()
    public numberPart:string;

    @IsNotEmpty()
    @IsString()
    public brand:string;

    @IsNotEmpty()
    @IsNumber()
    public stock: number;

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

    @IsNotEmpty()
    @IsString()
    public img1:string;
    
    constructor(
        model:string,
        numberPart:string,
        brand:string,
        stock:number,
        description:string,
        price:number,
        conditions:string,
        status:boolean,
        img1:string
    ){

        this.model=model;
        this.numberPart=numberPart;
        this.brand=brand;
        this.stock=stock;
        this.description=description;
        this.price=price;
        this.conditions=conditions;
        this.status=status;
        this.img1=img1;
    }

}


export class ValidatorUpdateProduct{
    @IsNotEmpty()
    @IsString()
    public model:string;

    @IsNotEmpty()
    @IsString()
    public numberPart:string;

    @IsNotEmpty()
    @IsString()
    public brand:string;

    @IsNotEmpty()
    @IsNumber()
    public stock: number;

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

    @IsNotEmpty()
    @IsString()
    public img1:string;
    
    constructor(
        model:string,
        numberPart:string,
        brand:string,
        stock:number,
        description:string,
        price:number,
        conditions:string,
        status:boolean,
        img1:string
    ){

        this.model=model;
        this.numberPart=numberPart;
        this.brand=brand;
        this.stock=stock;
        this.description=description;
        this.price=price;
        this.conditions=conditions;
        this.status=status;
        this.img1=img1;
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
    @IsNumber()
    public imgId:number;

    constructor(
        imgId:number
    ){
        this.imgId=imgId;
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
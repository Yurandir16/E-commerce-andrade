import { IsInt,IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';

export class validatorPostProduct{
    @IsNotEmpty()
    @IsNumber()
    public id:number;

    @IsNotEmpty()
    @IsString()
    public user_id: string;

    @IsNotEmpty()
    @IsNumber()
    public product_id: number;

    constructor(
        id:number,
        user_id:string,
        product_id:number
    ){
        this.id=id;
        this.user_id=user_id;
        this.product_id=product_id;
    }

}

export class validatorViewProduct{
    @IsNotEmpty()
    @IsString()
    public uuid:string;

    constructor(
        uuid:string
    ){
        this.uuid=uuid;
    }
}

export class validatorDeleteProduct{
    @IsNotEmpty()
    @IsNumber()
    public id:number;

    constructor(
        id:number
    ){
        this.id=id;
    }
}
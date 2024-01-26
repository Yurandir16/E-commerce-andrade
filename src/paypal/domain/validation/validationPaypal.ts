import { IsInt,IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';

export class ValidationCreatePaypal{
    @IsNotEmpty()
    @IsNumber()
    public id:number;

    constructor(
        id:number
    ){
        this.id=id
    }
}
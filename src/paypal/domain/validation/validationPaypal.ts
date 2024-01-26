import { IsInt,IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail, IsNumber} from 'class-validator';

export class ValidationCreatePaypal{
    @IsNotEmpty()
    @IsString()
    public uuid:string;

    constructor(
        uuid:string
    ){
        this.uuid=uuid
    }
}
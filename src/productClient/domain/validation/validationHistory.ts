import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ValidatorHistory{
    @IsNotEmpty()
    @IsString()
    public uuid_user:string;

    constructor(
        uuid_user:string
    ){
        this.uuid_user=uuid_user
    }
}

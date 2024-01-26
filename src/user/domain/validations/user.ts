import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional,IsEmail} from 'class-validator';


export class ValidatorRegisterUser {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(10) 
    public phone_number: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

   

    constructor(
        uuid: string,
        name: string,
        email: string,
        phone_number: string,
        password: string,
    ) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
        this.password = password;
    }


}
export class ValidateLogin {
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        email:string,
        password:string,
    ){
        this.email = email,
        this.password = password
    }
}



export class ValidatorupdatePassword {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    constructor(
        uuid: string,
        password: string
    ) {
        this.uuid = uuid;
        this.password = password;
    }
}


export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    constructor(uuid:string) {
        this.uuid = uuid
    }
}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    public email?: string;

    @IsOptional()
    @IsString()
    @Length(10)  
    public phone_number?: string;

    @IsOptional()
    @IsString()
    public img_url?: string;

   
    constructor( 
        uuid: string,
        name?: string,
        email?: string,
        phone_number?: string,
        img_url?: string,
        ) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number
        this.img_url = img_url
    }
}


export class User {
    constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public phone_number: string,
    public password: string,
    public verified: boolean
    ){}
}

export class ResponseLogin {
    constructor(
    public uuid: string,
    public name: string,
    public email: string,
    public phone_number: string,
    public token: string,
    public verified:boolean
    ){}
}

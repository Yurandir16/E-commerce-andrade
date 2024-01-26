import { ResponseLogin, User } from "../entities/user";

export interface IUsuarioRepository {
    registerUser( 
        uuid: string,
        name: string,
        email: string,
        phone_number: string,
        password: string,
    ): Promise<User | null | string | Error> ;

    getUserId(uuid:string):Promise<User|string |null>

    loginUser(
        email:string,
        password:string
    ):Promise<ResponseLogin | string | null>  //listo

    updateUserById( //listo 
        uuid: string,
        name?: string,
        email?: string,
        phone_number?: string,
        img_url?: string
    ): Promise<User | null>

    updatePassword(
        uuid: string, 
        password: string
        ): Promise<User | null> 

    verify(
        uuid:string,
    ):Promise<ResponseLogin|null>

 //listo
}


import { validate } from "class-validator";
import { User } from "../../domain/entities/user";
import { v4 as uuid } from "uuid";
import { IUsuarioRepository } from "../../domain/repositories/userRepository";
import { ValidatorRegisterUser } from "../../domain/validations/user";
import { encrypt } from "../../../helpers/ashs";
import { MailNodemailerProvider } from "../../utils-adapters/nodemailer";



export class RegisterUserUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository, readonly mailprovider: MailNodemailerProvider) { }

    async run(
        name: string,
        email: string,
        phone_number: string,
        password: string,
    ): Promise<User | null | string | Error>{

        const miuuid: string = uuid()
    
        let data = new ValidatorRegisterUser(miuuid, name, email, phone_number, password);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        const hashPassword = await encrypt(password)
        try {
            const createUser = await this.usuarioRepository.registerUser(
                miuuid,
                name,
                email,
                phone_number,
                hashPassword,
            );

            return createUser;
        } catch (error) {
            return null;
        }
    }
}
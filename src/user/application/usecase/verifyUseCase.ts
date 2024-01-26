import { validate } from "class-validator";
import { ResponseLogin, User } from "../../domain/entities/user";
import { IUsuarioRepository } from "../../domain/repositories/userRepository";


export class VerifyUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    
    async run(
        uuid:string,
        ): Promise<ResponseLogin | null> {
            const verifyEmail = await this.usuarioRepository.verify(uuid);
            return verifyEmail;
    }
}
import { validate } from "class-validator";
import { User } from "../../domain/entities/user";
import { IUsuarioRepository } from "../../domain/repositories/userRepository";
import { ValidatorUpdate } from "../../domain/validations/user";
import { url } from "inspector";


export class UpdateUserByIdUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(
        uuid: string,
        name?: string,
        email?: string,
        phone_number?: string,
        img_url?: string,
        ): Promise<User | null> {

        let post = new ValidatorUpdate(uuid,name,email,phone_number,img_url)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const updateUserById = await this.usuarioRepository.updateUserById(uuid,name,email,phone_number,img_url);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}
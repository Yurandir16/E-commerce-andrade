import { IUsuarioRepository } from "../../domain/repositories/userRepository";
import {validate} from "class-validator";
import { ValidatorId } from "../../domain/validations/user";

export class getUserIdCase {
    constructor(readonly RestaurantRepo: IUsuarioRepository){}
    
    async run(uuid:string){
        
        let data = new ValidatorId(uuid);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const idUser = await this.RestaurantRepo.getUserId(
                uuid
            );
            return idUser;
        } catch (error) {
            return null;
        }
    }
}    
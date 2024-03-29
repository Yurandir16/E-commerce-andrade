import { paypalRepository } from "../domain/respositories/paypalRepository";
import { validate } from "class-validator";
import { ValidationCreatePaypal } from "../domain/validation/validationPaypal";

export class CreatePaypalUseCase {
    constructor(readonly paypalRepository: paypalRepository){}

    async run (
        uuid:string
    ): Promise< null | string | Error>{

        let data = new ValidationCreatePaypal(uuid);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createPaypal = await this.paypalRepository.createPaypal(
                uuid
            );

            return createPaypal;
        }catch (error) {
            return null;
        }
    }
}
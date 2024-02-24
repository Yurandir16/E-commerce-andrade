import { history } from "../../domain/entities/productClient";
import { ProductClientRepository } from "../../domain/repositories/productClientRepository";
import { ValidatorHistory } from "../../domain/validation/validationHistory";
import { validate } from "class-validator";

export class viewHistoryUseCase {
    constructor(readonly historyRepository: ProductClientRepository){}

    async run (uuid_user:string): Promise<history[] | null | string | Error>{

        let data = new ValidatorHistory(uuid_user);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const viewHistory = await this.historyRepository.listAllHistoryPro(
                uuid_user
            );
            //console.log("case use:",viewUserShop)
            return viewHistory||[];
        }catch (error) {
            return null;
        }
    }
}

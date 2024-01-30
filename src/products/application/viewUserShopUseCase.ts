import { shoppingRe } from "../domain/entities/shoppingR";
import { productsRepository } from "../domain/repositories/productRepository";
import { validatorViewUserShop } from "../domain/validation/validations";
import { validate } from "class-validator";

export class viewUserShopReUseCase {
    constructor(readonly registerShopRepository: productsRepository){}

    async run (customer_id:string): Promise<shoppingRe | null | string | Error>{

        let data = new validatorViewUserShop(customer_id);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const viewUserShop = await this.registerShopRepository.viewUserShop(
                customer_id
            );
            console.log("case use:",viewUserShop)
            return viewUserShop;
        }catch (error) {
            return null;
        }
    }
}

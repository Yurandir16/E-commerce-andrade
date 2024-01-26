import { validate } from "class-validator";
import { cartRepository } from "../../domain/repositories/cartRepository";
import { validatorDeleteProduct } from "../../domain/validations/cartValidation";

export class DeleteCartShoppingCase {
    constructor(readonly cartDeleteProductRepo: cartRepository){}
    
    async run(id:number){
        
        let data = new validatorDeleteProduct(id);
        const validation = await validate(data)
        console.log(validation)
        if (validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try {
            const deletePro = await this.cartDeleteProductRepo.deleteCartProduct(
                id
            );
            return deletePro;
        } catch (error) {
            return null;
        }
    }
}    
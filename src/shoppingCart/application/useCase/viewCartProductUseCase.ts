import { cart } from "../../domain/entities/cart";
import { cartRepository } from "../../domain/repositories/cartRepository";
import { validatorViewProduct } from "../../domain/validations/cartValidation";
import { validate } from "class-validator";

export class viewProductCartUseCase {
    constructor(readonly cartRepository: cartRepository){}

    async run (
        uuid:string
    ): Promise<cart | null | string | Error>{

        let data = new validatorViewProduct(uuid);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const viewProductCart = await this.cartRepository.viewCartProduct(
                uuid
            );
            return viewProductCart;
        }catch (error) {
            return null;
        }
    }
}

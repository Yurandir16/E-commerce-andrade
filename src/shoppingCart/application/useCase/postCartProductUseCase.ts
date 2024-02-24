import { validate } from "class-validator";
import { cart } from "../../domain/entities/cart";
import { validatorPostProduct } from "../../domain/validations/cartValidation";
import { cartRepository } from "../../domain/repositories/cartRepository";


export class CreateProductCartUseCase {
    constructor(readonly cartRepository: cartRepository){}

    async run (
        id:number,
        user_id:string,
        product_id:number
    ): Promise<cart | null | string | Error>{

        let data = new validatorPostProduct(user_id, product_id);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createProductCart = await this.cartRepository.postProductsCart(
                id,
                user_id,
                product_id
            );

            return createProductCart;
        }catch (error) {
            return null;
        }
    }
}
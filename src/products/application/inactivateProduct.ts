import { validate } from "class-validator";
import { product } from "../domain/entities/product";
import { ValidatorInactivateProduct } from "../domain/validation/validations";
import { productsRepository } from "../domain/repositories/productRepository";


export class InactivateProductUseCase {
    constructor(readonly productRepository: productsRepository){}

    async run (
        id:number,status:boolean
    ): Promise<product | null | string | Error>{

        let data = new ValidatorInactivateProduct(id,status);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createProduct = await this.productRepository.inactivateProduct(
                id,status
            );

            return createProduct;
        }catch (error) {
            return null;
        }
    }
}
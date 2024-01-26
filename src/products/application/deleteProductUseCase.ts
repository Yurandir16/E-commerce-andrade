import { validate } from "class-validator";
import { product } from "../domain/entities/product";
import { ValidatorDeleteProduct } from "../domain/validation/validations";
import { productsRepository } from "../domain/repositories/productRepository";


export class DeleteProductUseCase {
    constructor(readonly productRepository: productsRepository){}

    async run (
        id:number
    ): Promise<product | null | string | Error|boolean>{

        let data = new ValidatorDeleteProduct(id);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createProduct = await this.productRepository.deleteProduct(
                id
            );
            return createProduct;
        }catch (error) {
            return null;
        }
    }
}
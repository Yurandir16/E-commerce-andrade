import { validate } from "class-validator";
import { product } from "../domain/entities/product";
import { validatorImage } from "../domain/validation/validations";
import { productsRepository } from "../domain/repositories/productRepository";


export class viewImageUseCase {
    constructor(readonly productRepository: productsRepository){}

    async run (
        imgId:number
    ): Promise<product | null | string | Error>{

        let data = new validatorImage(imgId);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createProduct = await this.productRepository.viewImage(
                imgId
            );

            return createProduct;
        }catch (error) {
            return null;
        }
    }
}
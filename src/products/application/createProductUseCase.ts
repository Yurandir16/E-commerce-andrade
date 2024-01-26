import { validate } from "class-validator";
import { product } from "../domain/entities/product";
import { ValidatorCreateProduct } from "../domain/validation/validations";
import { productsRepository } from "../domain/repositories/productRepository";


export class CreateProductUseCase {
    constructor(readonly productRepository: productsRepository){}

    async run (
        id:number,namePart:string,numberPart:number,amount:number, image:string,description:string, price:number,conditions:string,status:boolean
    ): Promise<product | null | string | Error>{

        let data = new ValidatorCreateProduct(id, namePart,numberPart,amount,image,description,price,conditions,status);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createProduct = await this.productRepository.createProduct(
                id, namePart,numberPart,amount,image,description,price,conditions,status
            );

            return createProduct;
        }catch (error) {
            return null;
        }
    }
}
import { validate } from "class-validator";
import { product } from "../domain/entities/product";
import { ValidatorUpdateProduct } from "../domain/validation/validations";
import { productsRepository } from "../domain/repositories/productRepository";


export class UpdateProductUseCase {
    constructor(readonly productRepository: productsRepository){}

    async run (
        id:number,namePart:string,numberPart:number,amount:number, image:string,description:string, price:number,conditions:string,status:boolean
    ): Promise<product | null | string | Error>{

        let data = new ValidatorUpdateProduct(id, namePart,numberPart,amount,image,description,price,conditions,status);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createProduct = await this.productRepository.updateProduct(
                id, namePart,numberPart,amount,image,description,price,conditions,status
            );

            return createProduct;
        }catch (error) {
            return null;
        }
    }
}
import { validate } from "class-validator";
import { product } from "../domain/entities/product";
import { ValidatorCreateProduct } from "../domain/validation/validations";
import { productsRepository } from "../domain/repositories/productRepository";


export class CreateProductUseCase {
    constructor(readonly productRepository: productsRepository){}

    async run (
        id:number,brand:string,model:string,numberPart:string,description:string, price:number,stock:number,conditions:string,status:boolean,img1:string,img2:string,img3:string,img4:string,img5:string): Promise<product | null | string | Error>{

        let data = new ValidatorCreateProduct(model,numberPart,brand,stock,description,price,conditions,status,img1);
        const validation = await validate(data)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const createProduct = await this.productRepository.createProduct(
                id,brand,model,numberPart,description,price,stock,conditions,status,img1,img2,img3,img4,img5
            );
            return createProduct;
        }catch (error) {
            return null;
        }
    }
}
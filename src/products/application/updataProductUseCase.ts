import { validate } from "class-validator";
import { product } from "../domain/entities/product";
import { ValidatorUpdateProduct } from "../domain/validation/validations";
import { productsRepository } from "../domain/repositories/productRepository";


export class UpdateProductUseCase {
    constructor(readonly productRepository: productsRepository){}

    async run (
        id:number,brand:string,model:string,numberPart:string,description:string, price:number,stock:number,conditions:string,status:boolean,img1:string,img2:string,img3:string,img4:string,img5:string
    ): Promise<product | null | string | Error>{

        let data = new ValidatorUpdateProduct(model,numberPart,brand,stock,description,price,conditions,status,img1);
        const validation = await validate(data)
        console.log(validation)
        if(validation.length > 0){
            throw new Error(JSON.stringify(validation))
        }

        try{
            const updateProduct = await this.productRepository.updateProduct(
                id,brand,model,numberPart,description,price,stock,conditions,status,img1,img2,img3,img4,img5
            );

            return updateProduct;
        }catch (error) {
            return null;
        }
    }
}
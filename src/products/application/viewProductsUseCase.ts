import { product } from "../domain/entities/product";
import { productsRepository } from "../domain/repositories/productRepository";

export class ViewProductUseCase {
    constructor(readonly productRepo: productsRepository){}
    async listProduct():Promise<product[]>{
        try {
            const productClient = await this.productRepo.viewProduct();
            return productClient|| [];
        } catch (error) {
            return [];
        }
    }
}    


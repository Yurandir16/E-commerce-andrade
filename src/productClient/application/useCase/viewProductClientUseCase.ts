import { productClient } from "../../domain/entities/productClient";
import { ProductClientRepository } from "../../domain/repositories/productClientRepository";

export class listAllProductClientCase {
    constructor(readonly productClientRepo: ProductClientRepository){}
    async listAllClientProduct():Promise<productClient[]>{
        try {
            const productClient = await this.productClientRepo.listAllProductClient();
            return productClient|| [];
        } catch (error) {
            return [];
        }
    }
}    


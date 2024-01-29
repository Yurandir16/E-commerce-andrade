import { shoppingRe } from "../domain/entities/shoppingR";
import { productsRepository } from "../domain/repositories/productRepository";

export class viewRegisterShopUseCase {
    constructor(readonly registerRepository:productsRepository ){}
    async run (): Promise<shoppingRe[] | null | string | Error>{
        try{
            const viewRegisterShop = await this.registerRepository.viewRegisterShop();
            return viewRegisterShop||[];
        }catch (error) {
            return null;
        }
    }
}

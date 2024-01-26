import { product } from "../entities/product";

export interface productsRepository{
    createProduct(id:number,namePart:string,numberPart:number,amount:number, image:string,description:string, price:number,conditions:string,status:boolean):Promise<product | null | string | Error> ;
    updateProduct(id:number,namePart:string,numberPart:number,amount:number, image:string,description:string, price:number,conditions:string,status:boolean):Promise<product | null | string | Error> ;
    inactivateProduct(id:number,status:boolean):Promise<product | null | string | Error> ;
    deleteProduct(id:number):Promise<boolean|string> ;
    viewProduct():Promise<product[]|null> ;
}
import { product } from "../entities/product";
import { shoppingRe } from "../entities/shoppingR";

export interface productsRepository{
    createProduct(id:number,brand:string,model:string,numberPart:string,description:string, price:number,stock:number,conditions:string,status:boolean,img1:string,img2:string,img3:string,img4:string,img5:string): Promise<product | null | string | Error>
    updateProduct(id:number,brand:string,model:string,numberPart:string,description:string, price:number,stock:number,conditions:string,status:boolean,img1:string,img2:string,img3:string,img4:string,img5:string):Promise<product | null | string | Error> ;
    inactivateProduct(id:number,status:boolean):Promise<product | null | string | Error>;
    deleteProduct(id:number):Promise<boolean|string>;
    viewProduct():Promise<product[]|null> ;
    viewRegisterShop():Promise<shoppingRe[]|null>;
    viewUserShop(customer_id:string):Promise<shoppingRe|null|string|any>;
    viewImage(imgId:number):Promise<product|null|string|any>;
}
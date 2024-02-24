import { productClient } from "../entities/productClient";
import { history } from "../entities/productClient";

export interface ProductClientRepository {
    listAllProductClient():Promise<productClient[]|null>;
    listAllHistoryPro(uuid_user:string):Promise<history[]|null>;
}
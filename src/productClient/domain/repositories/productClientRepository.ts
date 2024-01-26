import { productClient } from "../entities/productClient";

export interface ProductClientRepository {
    listAllProductClient():Promise<productClient[]|null>;
}
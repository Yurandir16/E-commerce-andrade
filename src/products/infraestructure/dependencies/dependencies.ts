import { mysqlProductRepositorys } from "../repositories/mysqlProductRepository";
import { CreateProductUseCase } from "../../application/createProductUseCase";
import { UpdateProductUseCase } from "../../application/updataProductUseCase";
import { DeleteProductUseCase } from "../../application/deleteProductUseCase";
import { InactivateProductUseCase } from "../../application/inactivateProduct";
import { ViewProductUseCase } from "../../application/viewProductsUseCase";
import { createProductControlller } from "../controllers/createProductController";
import { updateProductControlller } from "../controllers/updateProductController";
import { inactiveProductController } from "../controllers/inactivateProductController";
import { deleteProductControlller } from "../controllers/deleteProductController";
import { viewProductController } from "../controllers/viewProductController";
import { viewImageProductController } from "../controllers/viewImageController";
import { viewRegisterShopUseCase } from "../../application/viewRegisterUserShopUseCase";
import { viewUserShopReUseCase } from "../../application/viewUserShopUseCase";
import { viewRegisterShopController } from "../controllers/viewRegisterUserShopController";
import { viewShopUserController } from "../controllers/viewUserShopController";

const mysqlProduct = new mysqlProductRepositorys();

const createProCase = new CreateProductUseCase(mysqlProduct); 
const updateProCase = new UpdateProductUseCase(mysqlProduct);
const deleteProCase = new DeleteProductUseCase(mysqlProduct);
const inactivateProCase = new InactivateProductUseCase(mysqlProduct);
const viewProCase = new ViewProductUseCase(mysqlProduct);
const viewShopReCase = new viewRegisterShopUseCase(mysqlProduct);
const viewUserShop = new viewUserShopReUseCase(mysqlProduct);

export const createProController = new createProductControlller(createProCase);
export const updateProController = new updateProductControlller(updateProCase);
export const deleteProController = new deleteProductControlller(deleteProCase);
export const inactiveProController = new inactiveProductController(inactivateProCase);
export const viewProController = new viewProductController(viewProCase);
export const viewImageProController = new viewImageProductController();
export const viewReShopController = new viewRegisterShopController(viewShopReCase);
export const viewUserShopController = new viewShopUserController(viewUserShop);
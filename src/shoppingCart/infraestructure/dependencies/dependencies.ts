import { mysqlCartProductRepositorys } from "../repositories/mysqlCartRepository";
import { CreateProductCartUseCase } from "../../application/useCase/postCartProductUseCase";
import { CreateProductCartController } from "../controllers/cartShoopingController";
import { viewProductCartUseCase } from "../../application/useCase/viewCartProductUseCase";
import { viewProductCartController } from "../controllers/viewCartProduct";
import { DeleteCartShoppingCase } from "../../application/useCase/deleteCartProductUseCase";
import { DeleteProductController } from "../controllers/deleteCartShoppingController";

const mysqlCartProductRepository = new mysqlCartProductRepositorys();

const createCartUse = new CreateProductCartUseCase(mysqlCartProductRepository);
const viewCartUse = new  viewProductCartUseCase(mysqlCartProductRepository);
const deleteCartUse = new DeleteCartShoppingCase(mysqlCartProductRepository);

export const createCartController = new CreateProductCartController(createCartUse);
export const viewCartProductController = new viewProductCartController(viewCartUse);
export const deleteCartProductController = new DeleteProductController(deleteCartUse);
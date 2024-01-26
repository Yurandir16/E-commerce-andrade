import express from "express";
import { createCartController } from "../dependencies/dependencies";
import { viewCartProductController } from "../dependencies/dependencies";
import { deleteCartProductController } from "../dependencies/dependencies";

export const cartRoute = express.Router();

cartRoute.post('/createCart',createCartController.createCartProduct.bind(createCartController));
cartRoute.get('/viewShoppingCart/:uuid',viewCartProductController.viewCartProduct.bind(viewCartProductController));
cartRoute.delete('/deleteCartShopping/:id',deleteCartProductController.deleteCartProduct.bind(deleteCartProductController));
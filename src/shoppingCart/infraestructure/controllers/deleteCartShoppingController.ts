import { Request, Response } from "express";
import { DeleteCartShoppingCase } from "../../application/useCase/deleteCartProductUseCase";
import { cart } from "../../domain/entities/cart";

export class DeleteProductController {
    constructor(readonly deleteCartProductCase: DeleteCartShoppingCase){}
    async deleteCartProduct(req: Request, res: Response) {
        console.log("controller")
        try {
            const { id } = req.params;
            const cartDeleted = await this.deleteCartProductCase.run(Number(id));

            if (cartDeleted) {
                return res.status(200).send({
                    status: "success",
                    message: "producto eliminado del carrito"
                });
            }

            res.status(404).send({
                status: "error",
                message: "product not found"
            });
        } catch (error) {
            console.error("Error in DeleteCartProductController:", error);
            res.status(500).send({
                status: "error",
                message: "Error server"
            });
        }
    }
}


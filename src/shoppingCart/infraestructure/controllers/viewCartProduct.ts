import { Request, Response } from "express";
import { viewProductCartUseCase } from "../../application/useCase/viewCartProductUseCase";
import { cart } from "../../domain/entities/cart";

export class viewProductCartController {
    constructor(readonly viewProductCartCase: viewProductCartUseCase){}
    async viewCartProduct(req: Request, res: Response) {

        console.log("controller")

        try {
            let uuid= req.params.uuid;       

            let viewCartProduct = await this.viewProductCartCase.run(uuid)

            if (viewCartProduct instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: viewCartProduct.message
                });
            }

            if (Array.isArray(viewCartProduct) && viewCartProduct.length > 0) {
                return res.status(200).send({
                  status: "success",
                  data: {
                        user:uuid,
                        viewCartProduct
                    }
                });
              } else {
                return res.status(404).send({
                  status: "Not Found",
                  message: "No product found for the cart"
                });
              }
        } catch (error) {
            return null;
        }
    }

}
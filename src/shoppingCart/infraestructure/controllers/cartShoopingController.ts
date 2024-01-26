import { Request, Response } from "express";
import { cart } from "../../domain/entities/cart";
import { CreateProductCartUseCase } from "../../application/useCase/postCartProductUseCase";

export class CreateProductCartController {
    constructor(readonly createProductCartCase: CreateProductCartUseCase){}
    async createCartProduct(req: Request, res: Response) {
        console.log("controller")

        try {
            let id= Number(req.body.id);
            let user_id = req.body.user_id;
            let product_id = Number(req.body.product_id);         

            let createCartProduct = await this.createProductCartCase.run(
               id,
               user_id,
               product_id
            )

            if (createCartProduct instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: createCartProduct.message
                });
            }
            if(createCartProduct instanceof cart) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        id: createCartProduct.id,
                        user_id:createCartProduct.user_id,
                        product_id:createCartProduct.product_id
                    }

                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred cart."
                });
            }
        } catch (error) {
            return null;
        }
    }

}

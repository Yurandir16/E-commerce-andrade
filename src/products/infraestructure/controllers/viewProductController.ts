import { Request, Response } from "express";
import { ViewProductUseCase } from "../../application/viewProductsUseCase";

export class viewProductController {
    constructor(readonly viewProductCase: ViewProductUseCase){}
    async viewProduct(req: Request, res: Response) {

        console.log("controller")

        try {
            let viewProduct = await this.viewProductCase.listProduct()

            if (viewProduct instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: viewProduct.message
                });
            }

            if (Array.isArray(viewProduct) && viewProduct.length > 0) {
                return res.status(200).send({
                  status: "success",
                  data: viewProduct
                });
              } else {
                return res.status(404).send({
                  status: "Not Found",
                  message: "No product found for the product"
                });
              }
        } catch (error) {
            return null;
        }
    }

}
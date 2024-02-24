import { Request, Response } from "express";
import { viewRegisterShopUseCase } from "../../application/viewRegisterUserShopUseCase";

export class viewRegisterShopController {
    constructor(readonly viewRegisterShopCase: viewRegisterShopUseCase){}
    async viewRegisterShop(req: Request, res: Response) {

        console.log("controller")

        try {
            let viewRegiserShop = await this.viewRegisterShopCase.run()

            if (viewRegiserShop instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: viewRegiserShop.message
                });
            }
            
            if (Array.isArray(viewRegiserShop) && viewRegiserShop.length > 0) {
                return res.status(200).send({
                  status: "success",
                  data:"Todos los registros de compras:", viewRegiserShop
                });
              } else {
                return res.status(404).send({
                  status: "Not Found",
                  message: "No registerShipping found for the register"
                });
              }
        } catch (error) {
            return null;
        }
    }

}
import { Request, Response } from "express";
import { viewUserShopReUseCase } from "../../application/viewUserShopUseCase";

export class viewShopUserController {
    constructor(readonly viewShopUserCase: viewUserShopReUseCase){}
    async viewShopUser(req: Request, res: Response) {
        console.log("controller")

        try {
            let customer_id = req.params.customer_id;

            let viewShopUser = await this.viewShopUserCase.run(
               customer_id
            )
            if (viewShopUser instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: viewShopUser.message
                });
            }

            if (Array.isArray(viewShopUser) && viewShopUser.length > 0) {
                return res.status(200).send({
                  status: "success",
                  data: viewShopUser
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


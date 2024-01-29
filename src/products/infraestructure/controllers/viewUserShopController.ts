import { Request, Response } from "express";
import { shoppingRe } from "../../domain/entities/shoppingR";
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
            if(viewShopUser instanceof shoppingRe) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        customer_id:viewShopUser.customer_id,
                        given_name:viewShopUser.given_name,
                        surname:viewShopUser.surname,
                        email_address:viewShopUser.email_address,
                        country_code:viewShopUser.country_code,
                        address_line_1:viewShopUser.address_line_1,
                        address_line_2:viewShopUser.address_line_2,
                        admin_area_1:viewShopUser.admin_area_1,
                        admin_area_2:viewShopUser.admin_area_2,
                        postal_code:viewShopUser.postal_code,
                        currency_code_:viewShopUser.country_code,
                        amount_:viewShopUser.amount,
                        create_time:viewShopUser.create_time
                    }

                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred."
                });
            }
        } catch (error) {
            return null;
        }
    }

}

import { Request, Response } from "express";
import { CreatePaypalUseCase } from "../../application/createPaypalUseCase";

export class CreatePaypalController {
    constructor(readonly createPaypalCase: CreatePaypalUseCase){}
    async createPaypal(req: Request, res: Response) {
        console.log("controller")

        try {
            let uuid= req.params.id;          

            let createPaypal = await this.createPaypalCase.run(
                uuid
            )

            if (createPaypal instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: createPaypal.message
                });
            }
            if (createPaypal!==null){
                res.status(200).send({
                    status:"Success",
                    data:createPaypal
                });
            }else{
                res.status(404).send('No se pudo efectuar el pago')
            }

        } catch (error) {
            return null;
        }
    }

}

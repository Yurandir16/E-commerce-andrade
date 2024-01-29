import { Request, Response } from "express";
import { CreatePaypalUseCase } from "../../application/createPaypalUseCase";
import { viewPaypalUseCase } from "../../application/viewPaypalUseCase";

export class CreatePaypalController {
    constructor(readonly createPaypalCase: CreatePaypalUseCase,
        readonly viewPaypalCase:viewPaypalUseCase){}
    async createPaypal(req: Request, res: Response) {
        console.log("controller")

        try {
            let uuid= req.params.uuid;          

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

    async getPayment(req:Request, res:Response){
        const token = String(req.query.token);

        try{
            const pay = await this.viewPaypalCase.run(token);
            if(pay!==null){
                res.status(200).send({
                    status:"Success",
                    data:pay
                });
            }else{
                res.status(404).send('No se pudo obtener el pago')
            }
        }catch(error){
            res.status(500).send({
                status:"error",
                data:"Ocurrio un error",
                message:error,
            });
        }
    }
}

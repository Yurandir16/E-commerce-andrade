import { Request, Response } from "express";
import { InactivateProductUseCase } from "../../application/inactivateProduct";
import { product } from "../../domain/entities/product";

export class inactiveProductController {
    constructor(
        readonly inactiveProductUseCase: InactivateProductUseCase
    ) { }

    async inactiveProduct(req: Request, res: Response) {
        console.log("controller")
        try {
            let id = Number(req.params.id);
            let status = Boolean(req.body.status);
            if (isNaN(id)) {
                return res.status(400).send({
                    status: "Error",
                    message: "id debe ser un número"
                });
            }

            let inactive = await this.inactiveProductUseCase.run(id,status)
            if ( inactive instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    message:"product inactivate"
                });
            } 
            if (inactive instanceof product){
                return res.status(201).send({
                    status:"success"
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred inactive"
                })
            }
        } catch (error) {
            return null;
        }
    }
}
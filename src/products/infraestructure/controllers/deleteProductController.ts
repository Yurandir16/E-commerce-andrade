import { Request, Response } from "express";
import { DeleteProductUseCase } from "../../application/deleteProductUseCase";
import { product } from "../../domain/entities/product";

export class deleteProductControlller {
    constructor(
        readonly deleteProductCase: DeleteProductUseCase
    ) { }

    async deleteProduct(req: Request, res: Response) {
    
       
        console.log("controller")
        try {
            let id = Number(req.params.id);
           
            let deletePro = await this.deleteProductCase.run(id)

            console.log(deletePro)
            if ( deletePro instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    message: deletePro.message
                });
            } 
            if (deletePro instanceof product){
                return res.status(201).send({
                    status:"success",
                    data:"Prodcut eliminado"
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred while delete the product"
                })
            }
        } catch (error) {
            return null;
        }
    }
}
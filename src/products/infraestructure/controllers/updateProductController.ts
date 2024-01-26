import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../application/updataProductUseCase";
import { product } from "../../domain/entities/product";

export class updateProductControlller {
    constructor(
        readonly updateProductCase: UpdateProductUseCase
    ) { }

    async updateProduct(req: Request, res: Response) {
    
       
        console.log("controller")
        try {
            let id = Number(req.params.id);
            let namePart = req.body.namePart;
            let numberPart = Number(req.body.numberPart);
            let amount = Number(req.body.amount);
            let image = req.file?.originalname ||'';
            let description = req.body.description;
            let price = Number(req.body.price);
            let conditions = req.body.conditions;
            let status = Boolean(req.body.status);
           
            let updatePro = await this.updateProductCase.run(id,namePart,numberPart,amount,image,description,price,conditions,status)
            console.log(updatePro)
            if ( updatePro instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    message: updatePro.message
                });
            } 
            if (updatePro instanceof product){
                return res.status(201).send({
                    status:"success",
                    data:{
                        namePart:updatePro.namePart,
                        numberPart:updatePro.numberPart,
                        amount:updatePro.amount,
                        image: updatePro.image,
                        description: updatePro.description,
                        price: updatePro.price,
                        conditions:updatePro.conditions,
                        status: updatePro.status,
                    }
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred while update the product"
                })
            }
        } catch (error) {
            return null;
        }
    }
}
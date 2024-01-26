import { Request, Response } from "express";
import { CreateProductUseCase } from "../../application/createProductUseCase";
import { product } from "../../domain/entities/product";

export class createProductControlller {
    constructor(
        readonly createProductCase: CreateProductUseCase
    ) { }

    async createProduct(req: Request, res: Response) {
    
       
        console.log("controller")
        try {
            let id = Number(req.body.id);
            let namePart = req.body.namePart;
            let numberPart = req.body.numberPart;
            let amount = Number(req.body.amount);
            let image = req.file?.originalname ||'';
            let description = req.body.description;
            let price = Number(req.body.price);
            let conditions = req.body.conditions;
            let status = Boolean(req.body.status);
           
            let createPro = await this.createProductCase.run(id,namePart,numberPart,amount,image,description,price,conditions,status)
            console.log(createPro)
            if ( createPro instanceof Error) {
               return res.status(409).send({
                    status: "Error",
                    message: createPro.message
                });
            } 
            if (createPro instanceof product){
                return res.status(201).send({
                    status:"success",
                    data:{
                        namePart:createPro.namePart,
                        numberPart:createPro.numberPart,
                        amount:createPro.amount,
                        image: createPro.image,
                        description: createPro.description,
                        price: createPro.price,
                        conditions:createPro.conditions,
                        status: createPro.status,
                    }
                })
            }else{
                return res.status(500).send({
                    status:"error",
                    message:"An unexpected error occurred while create the product"
                })
            }
        } catch (error) {
            return null;
        }
    }
}
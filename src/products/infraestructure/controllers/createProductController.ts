import { Request, Response } from "express";
import { CreateProductUseCase } from "../../application/createProductUseCase";
import { product } from "../../domain/entities/product";

export class createProductControlller {
    
    constructor(
        readonly createProductCase: CreateProductUseCase
    ) { }

    async createProduct(req: Request, res: Response) {

        try {
            let id = Number(req.body.id);
            let brand = req.body.brand;
            let model = req.body.model;
            let numberPart = req.body.numberPart;
            let stock = Number(req.body.stock);
            let description = req.body.description;
            let price = Number(req.body.price);
            let conditions = req.body.conditions;
            let status = Boolean(req.body.status);

            console.log("ptm",brand)

        
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            let img1 = (files?.['img1']?.[0]?.originalname || '') as string;
            let img2 = (files?.['img2']?.[0]?.originalname || '') as string;
            let img3 = (files?.['img3']?.[0]?.originalname || '') as string;
            let img4 = (files?.['img4']?.[0]?.originalname || '') as string;
            let img5 = (files?.['img5']?.[0]?.originalname || '') as string;
            
            let createPro = await this.createProductCase.run(id,brand,model,numberPart,description,price,stock,conditions,status,img1,img2,img3,img4,img5)
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
                        brand:createPro.brand,
                        model:createPro.model,
                        numberPart:createPro.numberPart,
                        stock:createPro.stock,
                        description: createPro.description,
                        price: createPro.price,
                        conditions:createPro.conditions,
                        img1:createPro.img1,
                        img2:createPro.img2,
                        img3:createPro.img3,
                        img4:createPro.img4,
                        img5:createPro.img5,
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
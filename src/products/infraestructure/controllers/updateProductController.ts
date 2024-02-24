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
            let id = Number(req.body.id);
            let brand = req.body.brand;
            let model = req.body.model;
            let numberPart = req.body.numberPart;
            let stock = Number(req.body.stock);
            let description = req.body.description;
            let price = Number(req.body.price);
            let conditions = req.body.conditions;
            let status = Boolean(req.body.status);

            let img1 = req.file?.originalname ||'';
            let img2 = req.file?.originalname ||'';
            let img3 = req.file?.originalname ||'';
            let img4 = req.file?.originalname ||'';
            let img5 = req.file?.originalname ||'';
           
            let updatePro = await this.updateProductCase.run(id,brand,model,numberPart,description,price,stock,conditions,status,img1,img2,img3,img4,img5)
            //let updatePro = await this.updateProductCase.run(id, image_fk,model,numberPart,brand,amount,description,price,conditions,status)
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
                        //image_fk: updatePro.image_fk,
                        model:updatePro.model,
                        numberPart:updatePro.numberPart,
                        brand:updatePro.brand,
                        stock:updatePro.stock,
                        description: updatePro.description,
                        price: updatePro.price,
                        conditions:updatePro.conditions,
                        img1:updatePro.img1,
                        img2:updatePro.img2,
                        img3:updatePro.img3,
                        img4:updatePro.img4,
                        img5:updatePro.img5,
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
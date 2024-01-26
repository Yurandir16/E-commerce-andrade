import { Request, Response } from "express";
import { getUserIdCase } from "../../application/usecase/getUserIdUseCase";
import { User } from "../../domain/entities/user";

export class UserControllerGetId {
    constructor(
        readonly getUserIdUseCase: getUserIdCase
    ) { }

    async getRestaurantId(req: Request, res: Response) {
        
        console.log("controller")
        try {
            let uuid = req.params.uuid;

            let idUser = await this.getUserIdUseCase.run(uuid)
            console.log(idUser)
            if ( idUser instanceof Error) {
               return res.status(500).send({
                    status: "Error",
                    data: idUser.message
                });
            } 
            if (Array.isArray(idUser) && idUser.length>0){
                return res.status(201).send({
                    status:"Success",
                    message:idUser
                })
            }else{
               
                return res.status(404).send({
                    status:"Error",
                    data: "An unexpected error ocurred user"
                })
            }
        } catch (error) {
            return res.status(500).send({
                status: "Error",
                message: "An unexpected error occurred"
              });
        }
    }
}

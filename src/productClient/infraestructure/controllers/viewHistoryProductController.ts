import { Request, Response } from "express";
import { viewHistoryUseCase } from "../../application/useCase/viewHistoryProductUseCase";

export class viewHistoryController {
    constructor(readonly viewHistoryCase: viewHistoryUseCase){}
    async viewHistory(req: Request, res: Response) {
        console.log("controller")

        try {
            let uuid_user = req.params.uuid_user;

            let viewHistory = await this.viewHistoryCase.run(
               uuid_user
            )
            if (viewHistory instanceof Error) {
                return res.status(409).send({
                    status: "error",
                    message: viewHistory.message
                });
            }

            if (Array.isArray(viewHistory) && viewHistory.length > 0) {
                return res.status(200).send({
                  status: "success",
                  data: viewHistory
                });
              } else {
                return res.status(404).send({
                  status: "Not Found",
                  message: "No tienes ninguna compra"
                });
              }
        } catch (error) {
            return null;
        }
    }

}


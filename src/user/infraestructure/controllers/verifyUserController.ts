import { Request, Response } from "express";
import { VerifyUseCase } from "../../application/usecase/verifyUseCase";



export class VerifyController {
    constructor(readonly verifyUseCase: VerifyUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { uuid } = req.params as { uuid: string }; // o req.params!


            if (!this.verifyUseCase) {
                return res.status(500).send({
                    status: "error",
                    message: "VerifyUseCase is not initialized."
                });
            }
            
            const verification = await this.verifyUseCase.run(uuid);
            

            if (verification) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        message: "User successfully verified."
                    }
                });
            } else {
                console.log(uuid);
                return res.status(404).send({
                    status: "error",
                    message: "User not found for verification."
                });
            }
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred verifying the user."
                });
            }
        }
    }
}

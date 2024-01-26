import { Request, Response } from "express";
import { UpdateUserByIdUseCase } from "../../application/usecase/updateUserByIdUseCase";
import uploadToFirebase from "../../../helpers/saveImages";

export class UpdateUserByIdController {
    constructor(readonly updateUserByIdUseCase: UpdateUserByIdUseCase) { }
    async run(req: Request, res: Response) {
        try {

            let {
                uuid,
                name,
                email,
                phone_number,
            } = req.body


            if (name === undefined && email === undefined && phone_number === undefined) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: "no hay cambios"
                    }
                })
            }

            let UpdateUserById = await this.updateUserByIdUseCase.run(uuid, name, email, phone_number)

            if (UpdateUserById) {
                return res.status(200).send({
                    status: "succes",
                    data: {
                        update_user: UpdateUserById
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "User not found "
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update the user."
            });
        }
    }
}
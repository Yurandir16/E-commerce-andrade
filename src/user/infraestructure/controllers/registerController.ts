import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/usecase/registerUseCase";
import { User } from "../../domain/entities/user";
import { MailNodemailerProvider } from "../../utils-adapters/nodemailer";

export class ResgisterUserController {
    private readonly registerUserUseCase: RegisterUserUseCase;
    private readonly mailProvider: MailNodemailerProvider; // Inyecta tu proveedor de correo

    constructor(registerUserUseCase: RegisterUserUseCase, mailProvider: MailNodemailerProvider) {
        this.registerUserUseCase = registerUserUseCase;
        this.mailProvider = mailProvider;
    }

    async run(req: Request, res: Response) {
        console.log('controller');

        try {
            let {
                name,
                email,
                phone_number,
                password,
            } = req.body;

            let registerUser = await this.registerUserUseCase.run(
                name,
                email,
                phone_number,
                password,
            );

            if (registerUser instanceof Error) {
                if (registerUser.message.includes('Duplicate entry') && registerUser.message.includes('for key \'users.email\'')) {
                    return res.status(409).send({
                        status: "error",
                        message: "The email address is already in use. Please use a different email address.",
                    });
                } else if (registerUser.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(registerUser.message),
                    });
                } else {
                    return res.status(500).send({
                        status: "error",
                        message: registerUser.message,
                    });
                }
            }

            if (registerUser instanceof User) {
                // Envía el correo de bienvenida
                const message = {
                    to: {
                        name: registerUser.name,
                        email: registerUser.email,
                    },
                    from: {
                        name: 'Tu Nombre',
                        email: 'dariomuseru@gmail.com',
                    },
                    subject: 'Bienvenido a nuestra plataforma',
                    body: 'Gracias por registrarte. Bienvenido a nuestra plataforma.',
                };

                await this.mailProvider.sendMail(message);

                // Respuesta del controlador
                return res.status(201).send({
                    status: "success",
                    data: {
                        id: registerUser.uuid,
                        name: registerUser.name,
                        email: registerUser.email,
                        phone_number: registerUser.phone_number,
                    },
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while registering the user.",
                });
            }
        } catch (error) {
            // Manejo de errores específicos
            if (error instanceof Error) {
                return res.status(500).send({
                    status: "error",
                    message: error.message,
                });
            }

            // Para errores generales, se devuelve un error 500 con un mensaje genérico
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}

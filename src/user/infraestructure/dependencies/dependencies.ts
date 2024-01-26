import { MysqlUserRepository } from "../repositories/mysqUserRepository";
import { RegisterUserUseCase } from "../../application/usecase/registerUseCase";
import { ResgisterUserController } from "../controllers/registerController";
import { LoginUserController } from "../controllers/loginUserController";
import { LoginUserUseCase } from "../../application/usecase/loginUserUseCase";
import { UpdateUserByIdUseCase } from "../../application/usecase/updateUserByIdUseCase";
import { UpdateUserByIdController } from "../controllers/updateUseByIdController";
import { UpdatePasswordUserUsecase } from "../../application/usecase/updatePasswordUserUseCase";
import { UpdatePasswordController } from "../controllers/updatePasswordUserController";
import { getUserIdCase } from "../../application/usecase/getUserIdUseCase";
import { UserControllerGetId } from "../controllers/getUserController";
import { MailNodemailerProvider } from "../../utils-adapters/nodemailer";
import { VerifyUseCase } from "../../application/usecase/verifyUseCase";
import { VerifyController } from "../controllers/verifyUserController";

export const mysqlUserRepository = new MysqlUserRepository()
const mailProvider = new MailNodemailerProvider(); // O crea tu otro proveedor


// regitrar usuario
export const registerUserUseCase = new RegisterUserUseCase(mysqlUserRepository, mailProvider);
export const registerUserController = new ResgisterUserController(registerUserUseCase,mailProvider)

export const usergetUseCase = new getUserIdCase(mysqlUserRepository);
export const usergetController = new UserControllerGetId(usergetUseCase); 

//iniciar sesion
export const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository)
export const loginUserController = new LoginUserController(loginUserUseCase)

//actualizar usuario
export const updateUserByIdUseCase = new UpdateUserByIdUseCase(mysqlUserRepository)
export const updateUserByIdController = new UpdateUserByIdController(updateUserByIdUseCase)

// actualizar contraseña
export const updatePasswordUserUsecase = new UpdatePasswordUserUsecase(mysqlUserRepository)
export const updatePasswordController = new UpdatePasswordController(updatePasswordUserUsecase)

// verificar email
export const verifyUseCase = new VerifyUseCase(mysqlUserRepository)
export const  verifyController = new VerifyController(verifyUseCase)
 
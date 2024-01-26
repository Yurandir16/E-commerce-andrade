import express from "express";
import { loginUserController, registerUserController, updatePasswordController, updateUserByIdController,usergetController ,verifyController} from "../dependencies/dependencies";
import { validateToken } from "../../../helpers/veryfyToken";

export const userRoutes = express.Router();

userRoutes.get('/:uuid',usergetController.getRestaurantId.bind(usergetController));
userRoutes.post('/',registerUserController.run.bind(registerUserController)) 

userRoutes.post('/login',loginUserController.run.bind(loginUserController))

userRoutes.put('/id',validateToken,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.put('/restar_password',updatePasswordController.run.bind(updatePasswordController))

userRoutes.get('/verify/:uuid',verifyController.run.bind(verifyController))












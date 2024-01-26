import { PaypalRepositoryr } from "../repositories/mysqlPaypalRepository";
import { CreatePaypalUseCase} from "../../application/createPaypalUseCase";
import { CreatePaypalController } from "../controllers/createPaypalController";

const mysqlPaypal = new PaypalRepositoryr();

const createPaypalUse = new CreatePaypalUseCase(mysqlPaypal);

export const createPaypalController = new CreatePaypalController(createPaypalUse);
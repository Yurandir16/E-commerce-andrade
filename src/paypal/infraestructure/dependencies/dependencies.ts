import { PaypalRepositoryr } from "../repositories/mysqlPaypalRepository";
import { CreatePaypalUseCase} from "../../application/createPaypalUseCase";
import { CreatePaypalController } from "../controllers/createPaypalController";
import { viewPaypalUseCase } from "../../application/viewPaypalUseCase";

const mysqlPaypal = new PaypalRepositoryr();

const createPaypalUse = new CreatePaypalUseCase(mysqlPaypal);
const vieweExtracterUse = new viewPaypalUseCase(mysqlPaypal);

export const createPaypalController = new CreatePaypalController(createPaypalUse,vieweExtracterUse);
import { listAllProductClientCase } from "../../../productClient/application/useCase/viewProductClientUseCase";
import { AllProductClientController } from "../../../productClient/infraestructure/controllers/viewProductClientController";
import { mysqlProductClientRepositorys } from "../repositories/mysqlProductClientRepository";
import { viewHistoryController } from "../controllers/viewHistoryProductController";
import { viewHistoryUseCase } from "../../application/useCase/viewHistoryProductUseCase";

export const mysqlProductRepository = new mysqlProductClientRepositorys();

const viewProductUseCase = new listAllProductClientCase(mysqlProductRepository);
const viewHistory = new viewHistoryUseCase(mysqlProductRepository);

export const viewProClientController = new AllProductClientController(viewProductUseCase);
export const viewHistoryProController = new viewHistoryController(viewHistory);
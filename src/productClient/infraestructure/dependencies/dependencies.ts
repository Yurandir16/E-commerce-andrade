import { listAllProductClientCase } from "../../../productClient/application/useCase/viewProductClientUseCase";
import { AllProductClientController } from "../../../productClient/infraestructure/controllers/viewProductClientController";
import { mysqlProductClientRepositorys } from "../repositories/mysqlProductClientRepository";

export const mysqlProductRepository = new mysqlProductClientRepositorys();

const viewProductUseCase = new listAllProductClientCase(mysqlProductRepository);

export const viewProClientController = new AllProductClientController(viewProductUseCase);

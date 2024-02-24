import express from "express";
import { viewProClientController,viewHistoryProController } from "../dependencies/dependencies";

export const proClientRoutes = express.Router();

proClientRoutes.get('/viewProductClient',viewProClientController.listAllClientProducts.bind(viewProClientController));
proClientRoutes.get('/viewHistory/:uuid_user',viewHistoryProController.viewHistory.bind(viewHistoryProController));
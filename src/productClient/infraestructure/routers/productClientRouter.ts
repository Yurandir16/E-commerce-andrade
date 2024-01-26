import express from "express";
import { viewProClientController } from "../dependencies/dependencies";

export const proClientRoutes = express.Router();

//Client
proClientRoutes.get('/viewProductClient',viewProClientController.listAllClientProducts.bind(viewProClientController));
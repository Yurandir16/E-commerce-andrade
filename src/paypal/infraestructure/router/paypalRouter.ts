import express from "express";
import { createPaypalController } from "../dependencies/dependencies";

export const paypalRoutes = express.Router();

paypalRoutes.post('/paypal',createPaypalController.createPaypal.bind(createPaypalController));
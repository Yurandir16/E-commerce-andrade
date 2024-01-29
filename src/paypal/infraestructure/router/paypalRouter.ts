import express from "express";
import { createPaypalController } from "../dependencies/dependencies";

export const paypalRoutes = express.Router();

paypalRoutes.post('/payment/:uuid',createPaypalController.createPaypal.bind(createPaypalController));
paypalRoutes.get('/extracter_payment/',createPaypalController.getPayment.bind(createPaypalController));

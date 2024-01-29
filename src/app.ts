import express from "express";
import cors from "cors";
import "dotenv/config";
import { proRoutes } from "./products/infraestructure/routers/productRouter";
import { proClientRoutes } from "./productClient/infraestructure/routers/productClientRouter";
import { cartRoute } from "./shoppingCart/infraestructure/routers/cartRouter";
import { userRoutes } from "./user/infraestructure/routers/userRouter";
import { paypalRoutes } from "./paypal/infraestructure/router/paypalRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', proRoutes);
app.use('/client',proClientRoutes);
app.use('/cart',cartRoute);
app.use('/user',userRoutes);
app.use('/paypal',paypalRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`port running in the port ${port}`);
});



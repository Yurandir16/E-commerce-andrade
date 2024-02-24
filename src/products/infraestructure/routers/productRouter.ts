import express from "express";
import { createProController, viewProController, inactiveProController, deleteProController, updateProController, viewImageProController, viewReShopController, viewUserShopController} from "../dependencies/dependencies";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/assets');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

export const proRoutes = express.Router();

proRoutes.post('/addProduct', upload.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 },
  { name: 'img4', maxCount: 1 },
  { name: 'img5', maxCount: 1 }]), 
createProController.createProduct.bind(createProController));

proRoutes.get('/viewImage/:imgId', viewImageProController.viewImageProduct.bind(viewImageProController));
proRoutes.get('/listProduct', viewProController.viewProduct.bind(viewProController));
proRoutes.get('/viewRegisterShop',viewReShopController.viewRegisterShop.bind(viewReShopController));
proRoutes.get('/viewUserShop/:customer_id',viewUserShopController.viewShopUser.bind(viewUserShopController));
proRoutes.put('/inactivateProduc/:id', inactiveProController.inactiveProduct.bind(inactiveProController));
proRoutes.put('/updateProduc/:id', upload.single('image'), updateProController.updateProduct.bind(updateProController));
proRoutes.delete('/destroyProduct/:id', deleteProController.deleteProduct.bind(deleteProController));



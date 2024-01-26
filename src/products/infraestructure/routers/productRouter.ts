import express from "express";
import { createProController, listProController, inactiveProController, deleteProController, updateProController, viewImagePropController} from "../dependencies/dependencies";
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

proRoutes.post('/addProduct', upload.single('image'), createProController.createProduct.bind(createProController));
proRoutes.get('/viewImage', viewImagePropController.getImageRestaurant.bind(viewImagePropController));
proRoutes.get('/listProduct', listProController.listAllProducts.bind(listProController));
proRoutes.delete('/destroyProduct/:id', deleteProController.deleteProduct.bind(deleteProController));
proRoutes.put('/inactivateProduc/:id', inactiveProController.inactiveProduct.bind(inactiveProController));
proRoutes.put('/updateProduc/:id', upload.single('image'), updateProController.updateProduct.bind(updateProController));


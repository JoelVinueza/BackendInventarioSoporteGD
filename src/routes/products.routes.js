import { Router } from "express";
import multer from "multer";
import {
  getProducts,

  getProductById, 
  getProductBySerie,
  getProductByModelo,
  getProductByMarca,
  getProductByNombre,
  getProductByBodega,
  
  createProduct,
  updateProductById,
  deleteProductById,
  importProductsFromExcel,
} from "../controllers/products.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();
const upload = multer({ dest: 'uploads/' })

router.get("/", getProducts);

router.get("/:productId", getProductById);
router.get("/:productSerie", getProductBySerie);
router.get("/:productModelo", getProductByModelo);
router.get("/:productMarca", getProductByMarca);
router.get("/:productNombre", getProductByNombre);
router.get("/:productBodega", getProductByBodega);

router.post("/", [verifyToken, isModerator], createProduct);
router.post("/:import", [verifyToken, isAdmin, upload.single('file')], importProductsFromExcel);

router.put("/:productId", [verifyToken, isModerator], updateProductById);

router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;

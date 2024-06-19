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
import { verifyToken, isModeratorOrSupervisor, isAdminOrSupervisor } from "../middlewares/authJwt.js";

const router = Router();
const upload = multer({ dest: 'uploads/' })

router.get("/", getProducts);

router.get("/:productId", getProductById);
router.get("/:productSerie", getProductBySerie);
router.get("/:productModelo", getProductByModelo);
router.get("/:productMarca", getProductByMarca);
router.get("/:productNombre", getProductByNombre);
router.get("/:productBodega", getProductByBodega);

router.post("/", [verifyToken, isModeratorOrSupervisor], createProduct);
router.post("/import", [verifyToken, isAdminOrSupervisor, upload.single('file')], importProductsFromExcel);

router.put("/:productId", [verifyToken, isModeratorOrSupervisor], updateProductById);

router.delete("/:productId", [verifyToken, isAdminOrSupervisor], deleteProductById);

export default router;

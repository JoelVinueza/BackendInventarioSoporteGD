import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductBySerie,
  getProductByModelo,
  getProductByMarca,
  getProductByNombre,
  getProductByBodega,
  getProductById,
} from "../controllers/products.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);
router.get("/:productSerie", getProductBySerie);
router.get("/:productModelo", getProductByModelo);
router.get("/:productMarca", getProductByMarca);
router.get("/:productNombre", getProductByNombre);
router.get("/:productBodega", getProductByBodega);

router.post("/", [verifyToken, isModerator], createProduct);

router.put("/:productId", [verifyToken, isModerator], updateProductById);

router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;

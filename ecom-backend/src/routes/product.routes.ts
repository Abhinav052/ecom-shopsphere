import { Router } from "express";
import {
  createProductController,
  deleteProductById,
  getProduct,
  getProductById,
  updateProductById,
} from "../controllers/product.controller";
const router = Router();

router.post("/", createProductController);
router.get("/find", getProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);

export default router;

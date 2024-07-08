import { Router } from "express";
import {
  sellerRequestController,
  getPendingSellerRequestController,
  getResolvedSellerRequestController,
} from "../controllers/request.controller";
const router = Router();

router.post("/buyer-request", sellerRequestController);
router.get("/pending-request", getPendingSellerRequestController);
router.get("/resolved-request", getResolvedSellerRequestController);

export default router;

import { Router } from "express";
import {
  loginController,
  signUpController,
  testController,
} from "../controllers/auth.controller";
const router = Router();

router.get("/test", testController);

router.post("/sign-up", signUpController);
router.post("/sign-in", loginController);

export default router;

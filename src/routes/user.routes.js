import { Router } from "express";
import { getUsers, createUser, getUserByToken } from "../controllers/user.controller.js";
import { isAdminOrSupervisor, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.get("/", getUsers);
router.get("/userToken", [verifyToken], getUserByToken);
router.post("/", [verifyToken, isAdminOrSupervisor, checkExistingUser], createUser);

export default router;

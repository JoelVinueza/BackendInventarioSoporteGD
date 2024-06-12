import { Router } from "express";
import { getUsers, getUserByID, createUser } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserByID);
router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);

export default router;

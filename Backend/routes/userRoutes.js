import express from "express";
import { fetchUser } from "../controllers/userControllers/userControllers";
import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.get("/me", verifyToken, fetchUser);

export default router;
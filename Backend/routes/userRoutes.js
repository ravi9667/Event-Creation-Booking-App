import express from "express";
import { fetchUser } from '../controllers/userControllers/userControllers.js'
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/me", verifyToken, fetchUser);

export default router;
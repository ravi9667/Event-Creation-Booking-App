import express from "express";

import { signup } from "../controllers/authControllers/signupController.js";
import { signIn } from "../controllers/authControllers/loginController.js";
import { verifyLoginOtp } from "../controllers/authControllers/otpController.js";
import { forgotPassword, resetPassword } from "../controllers/authControllers/passwordController.js";

import { verifyEmail } from "../utils/verifyEmail.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signIn);
router.post("/verify-otp", verifyLoginOtp);

router.get("/verify-email/:token", verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
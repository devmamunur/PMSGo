import express from 'express';
import OtpController from "../controllers/otp.controller";
const otpRouter = express.Router();

otpRouter.get("/recover-verify-email/:email", OtpController.RecoverVerifyEmail);
otpRouter.get("/recover-verify-otp/:email/:otp", OtpController.RecoverVerifyOTP);
otpRouter.post("/recover-reset-pass", OtpController.RecoverResetPass);

export default otpRouter;
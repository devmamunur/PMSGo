import express from 'express';
import OtpController from "../controllers/otp.controller";
const otpRouter = express.Router();

otpRouter.post("/recover-verify-email", OtpController.RecoverVerifyEmail);
otpRouter.post("/recover-verify-otp", OtpController.RecoverVerifyOTP);
otpRouter.post("/recover-reset-pass", OtpController.RecoverResetPass);

export default otpRouter;
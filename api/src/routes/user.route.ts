import express from 'express';
import AuthVerifyMiddleware from "../middleware/auth.middleware";
const UsersController = require("../controllers/user.controller")
const userRouter = express.Router();

userRouter.post("/registration", UsersController.registration);
userRouter.post("/login", UsersController.login);
userRouter.post("/profile-update", AuthVerifyMiddleware, UsersController.profileUpdate);
userRouter.get("/profile-details", AuthVerifyMiddleware, UsersController.profileDetails);

userRouter.get("/recover-verify-email/:email",UsersController.RecoverVerifyEmail);
userRouter.get("/recover-verify-otp/:email/:otp",UsersController.RecoverVerifyOTP);
userRouter.post("/recover-reset-pass",UsersController.RecoverResetPass);

export default userRouter;
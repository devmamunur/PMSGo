import express from 'express';
import AuthVerifyMiddleware from '../middleware/auth.middleware';
import UsersController from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.post('/registration', UsersController.registration);
userRouter.post('/login', UsersController.login);
userRouter.post('/profile-update', AuthVerifyMiddleware, UsersController.updateProfile);
userRouter.get('/profile-details', AuthVerifyMiddleware, UsersController.profileDetails);

export default userRouter;

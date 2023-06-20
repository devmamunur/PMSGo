import express, {Router} from 'express';
import {userController} from '../controllers/user.controller';
import {authMiddleware} from '../../../global/middleware/auth.middleware';

class UserRoute{
  private readonly router : Router;

  constructor() {
    this.router = express.Router();
  }

  public routes() : Router {
    this.router.get('/user', userController.getAllUser);
    this.router.post('/user', authMiddleware.onlyCompany, userController.create);
    return this.router;
  }

}
export const userRouter : UserRoute = new UserRoute();

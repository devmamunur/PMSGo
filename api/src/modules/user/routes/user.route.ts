import express, {Router} from 'express';
import {userController} from '../controllers/user.controller';
import {authMiddleware} from '../../../global/middleware/auth.middleware';

class UserRoute{
  private readonly router : Router;

  constructor() {
    this.router = express.Router();
  }

  public routes() : Router {
    this.router.get('/users', userController.get);
    this.router.post('/users', authMiddleware.onlyCompany, userController.create);
    return this.router;
  }

}
export const userRouter : UserRoute = new UserRoute();

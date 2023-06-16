import express, {Router} from 'express';

class UserRoute{
  private readonly router : Router;

  constructor() {
    this.router = express.Router();
  }

  public routes() : Router {
    this.router.get('/user');
    this.router.post('/user');
    return this.router;
  }

}
export const userRouter : UserRoute = new UserRoute();

import express, {Router} from 'express';
import SignupController from '../controllers/signup.controller';

class AuthRoute{
  private readonly router: Router;
  constructor() {
    this.router  = express.Router();
  }

  public routes() : Router{
    this.router.post('/signup', SignupController.signup);
    return this.router;
  }

}

export const authRouter : AuthRoute = new AuthRoute();

import express, {Router} from 'express';
import {signupController} from '../controllers/signup.controller';
import {signinController} from '../controllers/signin.controller';

class AuthRoute{
  private readonly router: Router;
  constructor() {
    this.router  = express.Router();
  }

  public routes() : Router{
    this.router.post('/signup', signupController.signup);
    this.router.post('/signin', signinController.signin);
    return this.router;
  }

}

export const authRouter : AuthRoute = new AuthRoute();

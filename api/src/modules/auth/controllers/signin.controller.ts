import {Request, Response} from 'express';
import {SigninInterface} from '../interfaces/auth.interface';
import {signinValidation} from '../validations/signin.validation';
import {signinRepository} from '../repositories/signin.repository';
class SigninController{
  async signin(req: Request, res : Response) : Promise<void>{
    try{
      const reqBody : SigninInterface = req.body;
      await signinValidation.validate(reqBody);
      const  user = await signinRepository.signin(reqBody);
      res.status(200).json({message : 'Login successfully',  user : user});
    }catch (error){
      res.status(400).json({error : error.message});
    }
  }
}
export const signinController : SigninController = new SigninController();

import {Request, Response} from 'express';
import {signupValidation} from '../validations/signup.validation';
import {SignupInterface} from '../interfaces/signup.interface';
import {signupRepository} from '../repositories/signup.repository';

class SignupController{
   async signup(req : Request, res : Response){
    try {
      const reqBody : SignupInterface = req.body;
      await signupValidation.validate(reqBody);
      await signupRepository.signup(reqBody);
      res.status(200).json({message : 'Company created successfully'});
    }catch (error){
      res.status(400).json({error : error.message});
    }
  }
}

export const signupController : SignupController = new SignupController();

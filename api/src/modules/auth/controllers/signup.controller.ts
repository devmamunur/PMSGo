import {Request, Response} from "express";
import SignupValidation from "../validations/signup.validation";
import SignupRepository from "../repositories/signup.repository";
import {SignupInterface} from "../interfaces/signup.interface";
import HTTP_STATUS from 'http-status-codes';

class SignupController{
  static async signup(req : Request, res : Response){
    const reqBody : SignupInterface = req.body;
    await SignupValidation.validate(reqBody);
    const data = await SignupRepository.signup(reqBody);
    res.status(HTTP_STATUS.CREATED).json({message : 'Company created successfully', data});
  }
}

export default SignupController;

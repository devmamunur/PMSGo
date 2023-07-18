import Joi from 'joi';
import {Request} from 'express';
import UserModel from '../models/user.model';

class UserValidator{
  createSchema = Joi.object({
    company : Joi.string().required(),
    name : Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).trim(true).required(),
  });
  async validateUniqueEmail(resBody: Request['body']) {
    const {email} = resBody;
    const existingEmail = await UserModel.findOne({email: email});
    if (existingEmail) {
      throw new Error('Email must be unique');
    }
  }

  async createValidate(resBody : Request['body']){
    await this.validateUniqueEmail(resBody);
    await this.createSchema.validateAsync(resBody);
  }
}

export const userValidator : UserValidator = new UserValidator();

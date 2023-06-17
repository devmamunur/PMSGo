import Joi from 'joi';
import {Request} from 'express';
import CompanyModel from '../../company/models/company.model';
import {JoiRequestValidationError} from '../../../global/utility/error.handler.utility';
import UserModel from '../models/user.model';

class UserValidator{
  createSchema = Joi.object({
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
    await this.createSchema.validateAsync(resBody);
  }
}

export const userValidator : UserValidator = new UserValidator();










// *******************************
// I Will Rewrite All those Code
// ******************************

// import { Request } from 'express';
// import CompanyModel from '../../company/models/company.model';
// import UserModel from '../models/user.model';
//
// const Joi = require('joi');
//
// class UserValidator {
//   static registerSchema = Joi.object({
//     email: Joi.string().email().required(),
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     organization: Joi.string().alphanum().required(),
//     mobile: Joi.number().min(10).required(),
//     password: Joi.string().min(6).trim(true).required(),
//     photo: Joi.string()
//   });
//
//   static loginSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).trim(true).required()
//   });
//
//   static async validateUniqueEmail(resBody: Request['body']) {
//     const { email } = resBody;
//     const existingEmail = await UserModel.findOne({ email: email });
//     if (existingEmail) {
//       throw new Error('Email must be unique');
//     }
//   }
//
//
//   static async registerValidation(resBody: Request['body']) {
//     await this.validateUniqueEmail(resBody);
//     await this.registerSchema.validateAsync(resBody);
//     await this.validateUniqueOrganizationName(resBody);
//   }
//
//   static async loginValidation(resBody: Request['body']) {
//     await this.loginSchema.validateAsync(resBody);
//   }
// }
//
// export default UserValidator;

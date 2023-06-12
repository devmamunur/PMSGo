import Joi from 'joi';
import {Request} from "express";
import CompanyModel from "../../company/models/company.model";
import {JoiRequestValidationError} from "../../../global/utility/error.handler.utility";

class SignupValidation {
  static signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    workspace_name: Joi.string().required(),
    password: Joi.string().min(6).trim(true).required(),
  });

  static async validateUniqueEmail(resBody: Request['body']) {
    const {email} = resBody;
    const existingEmail = await CompanyModel.findOne({email: email});
    if (existingEmail) {
      throw new JoiRequestValidationError('Email must be unique');
    }
  }

  static async validate(resBody: Request['body']) {
    await this.validateUniqueEmail(resBody);
    await this.signupSchema.validateAsync(resBody);
  }
}

export default SignupValidation;

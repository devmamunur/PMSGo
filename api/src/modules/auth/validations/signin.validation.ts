import Joi from 'joi';
import {Request} from 'express';

class SigninValidation{

  signinSchema = Joi.object({
    type: Joi.string().valid('company', 'user', 'client', 'admin').required().messages({
      'any.only' : 'Type must be valid',
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).trim(true).required(),
  });
  async validate(resBody: Request['body']) {
    await this.signinSchema.validateAsync(resBody);
  }
}

export const signinValidation : SigninValidation = new SigninValidation();










// *******************************
// I Will Rewrite All those Code
// ******************************



// import Joi, { ObjectSchema } from 'joi';
//
//
//
// const loginSchema: ObjectSchema = Joi.object().keys({
//   username: Joi.string().required().min(4).max(8).messages({
//     'string.base': 'Username must be of type string',
//     'string.min': 'Invalid username',
//     'string.max': 'Invalid username',
//     'string.empty': 'Username is a required field'
//   }),
//   password: Joi.string().required().min(4).max(8).messages({
//     'string.base': 'Password must be of type string',
//     'string.min': 'Invalid password',
//     'string.max': 'Invalid password',
//     'string.empty': 'Password is a required field'
//   })
// });
//
// export { loginSchema };

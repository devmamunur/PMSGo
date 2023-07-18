import Joi from 'joi';
import {Request} from 'express';

class ProjectValidator{
  createSchema = Joi.object({
    name : Joi.string().required(),
    user : Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    budget: Joi.number().required()
  });
  async createValidate(resBody : Request['body']){
    await this.createSchema.validateAsync(resBody);
  }
}
export const projectValidator : ProjectValidator = new ProjectValidator();

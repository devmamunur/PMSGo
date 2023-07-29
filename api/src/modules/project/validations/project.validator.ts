import Joi from 'joi';
import {Request} from 'express';

class ProjectValidator{
  commonSchema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    budget: Joi.number().required(),
  });
  createSchema = this.commonSchema.keys({
    users: Joi.array().items(Joi.string().length(24)).min(1).required(),
  });

  deleteSchema = Joi.object({
    projectIds: Joi.array().items(Joi.string().length(24)).min(1).required()
  });
  async createValidate(resBody : Request['body']){
    await this.createSchema.validateAsync(resBody);
  };

  async updateValidate(resBody : Request['body']){
    await this.commonSchema.validateAsync(resBody);
  };
  async deleteValidate(resBody : Request['body']){
    await this.deleteSchema.validateAsync(resBody);
  }
}
export const projectValidator : ProjectValidator = new ProjectValidator();

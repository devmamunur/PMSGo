import {Request} from "express";
import OrganizationModel from "../models/organization.model";
import UserModel from "../models/user.model";

const Joi = require('joi');

class UserValidator {
    static registerSchema = Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        organization: Joi.string().alphanum().required(),
        mobile: Joi.number().min(10).required(),
        password: Joi.string().min(6).trim(true).required(),
        photo: Joi.string(),
    });

    static loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).trim(true).required(),
    });

    static async validateUniqueEmail(resBody: Request['body']) {
        const {email} = resBody;
        const existingEmail = await UserModel.findOne({email: email});
        if (existingEmail) {
            throw new Error('Email must be unique');
        }
    }

    static async validateUniqueOrganizationName(resBody: Request['body']) {
        const {organization} = resBody;
        const existingOrganization = await OrganizationModel.findOne({name: organization});
        if (existingOrganization) {
            throw new Error('Organization name must be unique');
        }
    }

    static async registerValidation(resBody: Request['body']) {
        await this.validateUniqueEmail(resBody);
        await this.registerSchema.validateAsync(resBody);
        await this.validateUniqueOrganizationName(resBody);
    }

    static async loginValidation(resBody : Request['body']){
        await this.loginSchema.validateAsync(resBody);
    }

}

export default UserValidator;

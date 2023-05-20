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
        // const validationErrors : any = [];
        // try {
        //     await this.registerSchema.validateAsync(resBody, {abortEarly: false});
        // } catch (error) {
        //     if (error.details) {
        //         validationErrors.push(...error.details.map((detail: any) => detail));
        //     }
        // }
        // try {
        //     await this.validateUniqueOrganizationName(resBody);
        // } catch (error) {
        //     validationErrors.push("\"organization\""+" "+error.message);
        // }
        // try {
        //     await this.validateUniqueEmail(resBody);
        // } catch (error) {
        //     validationErrors.push("\"email\""+" "+error.message);
        // }
        // if (validationErrors.length > 0) {
        //     throw new Error(validationErrors);
        // }
        await this.registerSchema.validateAsync(resBody, {abortEarly : false});
        await this.validateUniqueOrganizationName(resBody);
        await this.validateUniqueEmail(resBody);
    }
}

export default UserValidator;

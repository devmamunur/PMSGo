const Joi = require('joi');

class OtpValidator{
    static verifyEmailSchema = Joi.object({
        email: Joi.string().email().required(),
    });

    static verifyOTPSchema = Joi.object({
        email: Joi.string().email().required(),
        OTP: Joi.string().length(6).required()
    });

    static resetPassSchema = Joi.object({
        email: Joi.string().email().required(),
        OTP: Joi.string().length(6).required(),
        password: Joi.string().min(6).trim(true).required()
    })

    static async verifyEmailValidation(reqBody : Request['body']){
        await this.verifyEmailSchema.validateAsync(reqBody);
    }
    static async verifyOTPValidation(reqBody : Request['body']){
        await this.verifyOTPSchema.validateAsync(reqBody);
    }
    static async resetPassValidation(reqBody : Request['body']){
        await this.resetPassSchema.validateAsync(reqBody);
    }
}

export default OtpValidator;
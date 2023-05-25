import UserModel from '../models/user.model';
import {UpdateProfileRequestBody, UserInterface} from "../interfaces/user.interface";
import mongoose from 'mongoose';
import {Request} from "express";
import OrganizationModel from "../models/organization.model";
import GeneratePasswordUtility from "../utility/generate-password.utility";
import * as process from "process";
import generateTokenUtility from "../utility/generate-token.utility";
const objectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');

class UserRepository {
    static async registration(reqBody: Request['body']) {
        try {
            const organization = await OrganizationModel.create({
                name: reqBody.organization
            });
            // Hash the user's password with SHA-256
            reqBody.password = GeneratePasswordUtility(reqBody.password);
            reqBody.organization = organization._id;
            return await UserModel.create(reqBody);
        } catch (error) {
            throw error;
        }
    }

    static async login(reqBody: Request['body']) {
        try {
            reqBody.password = GeneratePasswordUtility(reqBody.password);
            const userMatched: any = await UserModel.aggregate([
                { $match: reqBody },
                {
                    $project: {
                        email: 1,
                        password: 1
                    },
                },
            ]);
            if (userMatched.length === 1) {
                const userData: any = await UserModel.aggregate([
                    { $match: reqBody },
                    {
                        $project: {
                            _id: 1,
                            userId: 1,
                            firstName: 1,
                            lastName: 1,
                            mobile: 1,
                            photo: 1,
                        },
                    },
                ]);
                const payload = { exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, data: userData[0]['_id'] };
                const token =  generateTokenUtility(payload);
                return { token: token, data: userData };
            }
        } catch (error) {
            throw error;
        }
    }


    static async updateProfile(userId: string, reqBody: UpdateProfileRequestBody) {
        try {
            const updateFields: Partial<UpdateProfileRequestBody> = {};

            if (reqBody.email) {
                updateFields.email = reqBody.email;
            }
            if (reqBody.firstName) {
                updateFields.firstName = reqBody.firstName;
            }
            if (reqBody.lastName) {
                updateFields.lastName = reqBody.lastName;
            }
            if (reqBody.mobile) {
                updateFields.mobile = reqBody.mobile;
            }
            if (reqBody.password) {
                updateFields.password = reqBody.password;
            } else {
                updateFields.password = undefined;
            }
            if (reqBody.photo) {
                updateFields.photo = reqBody.photo;
            } else {
                updateFields.photo = undefined;
            }
            const document = await UserModel.updateOne({_id: new objectId(userId)}, updateFields);


            const updatedDocument = await UserModel.aggregate([
                {$match: {_id: new objectId(userId)}},
                {$project: {email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1}},
            ])

            return {data: updatedDocument};

        } catch (error) {
            throw error;
        }
    }

    static profileDetails(userId: string) {
        return UserModel.aggregate([
            {
                $match:
                    {
                        _id: new objectId(userId)
                    }
            },
            {
                $project: {
                    _id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1
                }
            }
        ]);
    }
}

export default UserRepository;
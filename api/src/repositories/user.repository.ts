import UserModel from '../models/user.model';
import {UpdateProfileRequestBody} from "../interfaces/user.interface";
import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');

class UserRepository {
    static registration(data: any) {
        return UserModel.create(data);
    }

    static async login(data: any) {
        try {
            const userData = await UserModel.aggregate([
                {$match: data},
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
            let Payload = {exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, data: userData[0]['_id']};
            let token = jwt.sign(Payload, 'Secret123');
            return {token: token, data: userData};
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
            {$match: {_id: new objectId(userId)}},
            {$project: {_id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1}}
        ]);
    }
}

export default UserRepository;
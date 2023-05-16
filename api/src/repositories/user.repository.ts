import UserModel from '../models/user.model';
import {UpdateProfileRequestBody} from "../interfaces/user.interface";

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
                        _id: 0,
                        email: 1,
                        firstName: 1,
                        lastName: 1,
                        mobile: 1,
                        photo: 1,
                    },
                },
            ]);
            let Payload = {exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, data: userData[0]['email']};
            let token = jwt.sign(Payload, 'Secret123');
            return {token: token, data: data[0]};
        } catch (error) {
            throw error;
        }
    }
    static async updateProfile(email: string, reqBody: UpdateProfileRequestBody) {
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
            const document = await UserModel.updateOne({email}, updateFields);


            const updatedDocument = await UserModel.aggregate([
                {$match: {email}},
                {$project: {email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1}},
            ])

            return {data: updatedDocument};

        } catch (error) {
            throw error;
        }
    }
    static async profileDetails(email: any) {
        try {
            return await UserModel.aggregate([
                {$match: {email: email}},
                {$project: {_id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1}}]);
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;
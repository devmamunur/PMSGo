import mongoose, {Model, Schema} from 'mongoose';
import {UserInterface} from "../interfaces/user.interface";

const DataSchema: Schema<UserInterface> = new Schema({
    email: {
        type: String, unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobile: {
        type: String
    },
    password: {
        type: String
    },
    photo: {
        type: String
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organizations'
    },
    createdDate: {type: Date, default: Date.now()}
}, {versionKey: false})

const UserModel: Model<UserInterface> = mongoose.model<UserInterface>("users", DataSchema)

export default UserModel;
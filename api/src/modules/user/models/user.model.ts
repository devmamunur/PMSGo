import mongoose, { Model, Schema } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const DataSchema: Schema<UserInterface> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    email_verified_at: { type: Date, default: null },
    password: { type: String, required: true },
    remember_token: { type: String, default: null },
    type: { type: String, required: true, default: 'user' },
    currant_workspace: { type: Number, default: null },
    avatar: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zipcode: { type: String, default: null },
    country: { type: String, default: null },
    telephone: { type: String, default: null },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null }
  },
  { versionKey: false }
);

const UserModel: Model<UserInterface> = mongoose.model<UserInterface>('users', DataSchema);

export default UserModel;

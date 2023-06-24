import mongoose, { Model, Schema } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const DataSchema: Schema<UserInterface> = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: 'companies',
      required: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique : true  },
    password: { type: String, required: true },
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

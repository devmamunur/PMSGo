import mongoose, {Model, Schema} from 'mongoose';
import {UserProjectInterface} from '../interfaces/project.interface';

const DataSchema : Schema<UserProjectInterface> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'projects', required: true },
    is_active: { type: Number, required: true, default: 1 },
    permission: { type: String },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
  },
  {versionKey : false}
);

const UserProjectModel : Model<UserProjectInterface> = mongoose.model<UserProjectInterface>('user_projects', DataSchema);

export default UserProjectModel;

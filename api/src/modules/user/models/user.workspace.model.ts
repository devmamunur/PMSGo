import mongoose, { Model, Schema } from 'mongoose';
import {UserWorkspaceInterface} from '../interfaces/user.interface';

const DataSchema: Schema<UserWorkspaceInterface> = new Schema(
  {
    user : {
      type : Schema.Types.ObjectId,
      ref : 'users',
      required : true
    },
    workspace : {
      type : Schema.Types.ObjectId,
      ref : 'workspaces',
      required : true
    }
  },
  { versionKey: false }
);

const UserWorkspaceModel: Model<UserWorkspaceInterface> = mongoose.model<UserWorkspaceInterface>('user_workspaces', DataSchema);

export default UserWorkspaceModel;

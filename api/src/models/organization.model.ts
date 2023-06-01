import mongoose, { Model, Schema } from 'mongoose';
import { OrganizationInterface } from '../interfaces/organization.interface';

const DataSchema: Schema<OrganizationInterface> = new Schema(
  {
    name: { type: String, unique: true },
    invitedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    ],
    createdDate: { type: Date, default: Date.now() }
  },
  { versionKey: false }
);

const OrganizationModel: Model<OrganizationInterface> = mongoose.model<OrganizationInterface>('organizations', DataSchema);

export default OrganizationModel;

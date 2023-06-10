import mongoose, { Model, Schema } from 'mongoose';
import { CompanyInterface } from '../interfaces/company.interface';

const DataSchema: Schema<CompanyInterface> = new Schema(
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

const CompanyModel: Model<CompanyInterface> = mongoose.model<CompanyInterface>('organizations', DataSchema);

export default CompanyModel;

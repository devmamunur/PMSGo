import { Document, Types } from 'mongoose';

export interface CompanyInterface extends Document {
  name: string;
  invitedUsers: Types.ObjectId[];
  createdDate: Date;
}

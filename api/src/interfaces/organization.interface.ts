import { Document, Types } from 'mongoose';

export interface OrganizationInterface extends Document {
  name: string;
  invitedUsers: Types.ObjectId[];
  createdDate: Date;
}

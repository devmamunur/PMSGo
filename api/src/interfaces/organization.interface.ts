import {Document} from 'mongoose';

export interface OrganizationInterface extends Document {
    name: string;
    invitedUsers: Types.ObjectId[];
    createdDate: Date;
}
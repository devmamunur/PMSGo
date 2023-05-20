import { Document, Types } from 'mongoose';
export interface ProjectInterface extends Document {
    title: string;
    description: string;
    dueDate?: Date;
    startDate?: Date;
    endDate?: Date;
    createdDate: Date;
    organization: Types.ObjectId;
    assignedUsers: Types.ObjectId[];
    tasks: Types.ObjectId[];
}

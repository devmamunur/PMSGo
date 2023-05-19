import { Document } from 'mongoose';
export interface TaskInterface extends Document {
    title: string;
    description: string;
    status: string;
    dueDate?: Date;
    startDate?: Date;
    endDate?: Date;
    createdDate: Date;
}

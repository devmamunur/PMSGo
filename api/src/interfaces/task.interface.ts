import { Document } from 'mongoose';
export interface TaskInterface extends Document {
    title: string;
    description: string;
    status: string;
    userID: Number;
    createdDate: Date;
}

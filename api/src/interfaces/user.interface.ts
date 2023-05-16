import { Document } from 'mongoose';

export interface UserInterface extends Document {
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    password: string;
    photo: string;
    createdDate: Date;
}

export interface UpdateProfileRequestBody {
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    password?: string;
    photo?: string;
}

import { Document } from 'mongoose';

export interface OTPInterface extends Document {
    email: String;
    otp: String;
    status: Number;
    createdDate: Date;
}
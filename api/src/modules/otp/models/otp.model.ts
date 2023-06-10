import mongoose, { Model, Schema } from 'mongoose';
import { OTPInterface } from '../interfaces/otp.interface';

const DataSchema: Schema<OTPInterface> = new Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now() }
  },
  { versionKey: false }
);

const OTPModel: Model<OTPInterface> = mongoose.model<OTPInterface>('otps', DataSchema);

export default OTPModel;

import mongoose, { Model, Schema } from 'mongoose';
import { CompanyInterface } from '../interfaces/company.interface';

const DataSchema: Schema<CompanyInterface> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true },
    currant_workspace: { type: Number, default: null },
    avatar: { type: String, default: null },
    type: { type: String, required: true, default: 'company' },
    plan: { type: Number, default: null },
    requested_plan: { type: Number, required: true, default: 0 },
    plan_expire_date: { type: Date, default: null },
    payment_subscription_id: { type: String, default: null },
    is_trial_done: { type: Number, required: true, default: 0 },
    is_plan_purchased: { type: Number, required: true, default: 0 },
    interested_plan_id: { type: Number, required: true, default: 0 },
    is_register_trial: { type: Number, required: true, default: 0 },
    dark_mode: { type: Boolean, required: true, default: false },
    active_status: { type: Boolean, required: true, default: false },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null }
  },
  { versionKey: false }
);

const CompanyModel: Model<CompanyInterface> = mongoose.model<CompanyInterface>('companies', DataSchema);

export default CompanyModel;

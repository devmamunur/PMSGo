import {Document, Types} from 'mongoose';

export interface CompanyInterface extends Document {
  name: string;
  email: string;
  password: string;
  currant_workspace: Types.ObjectId | null;
  avatar: string | null;
  type: string;
  plan: Types.ObjectId | null;
  requested_plan: number;
  plan_expire_date: Date | null;
  payment_subscription_id: string | null;
  is_trial_done: number;
  is_plan_purchased: number;
  interested_plan_id: number;
  is_register_trial: number;
  dark_mode: boolean;
  active_status: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

import { Document, Types } from 'mongoose';
export interface PlanInterface extends Document {
  id: number;
  name: string;
  monthly_price: number;
  annual_price: Types.Decimal128;
  status: number;
  is_default: number;
  trial_days: number;
  max_workspaces: number;
  max_users: number;
  max_clients: number;
  max_projects: number;
  description?: string | null;
  image?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

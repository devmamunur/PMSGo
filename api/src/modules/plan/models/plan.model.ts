import mongoose, { Model, Schema } from 'mongoose';
import { PlanInterface } from '../interfaces/plan.interface';

const DataSchema: Schema<PlanInterface> = new Schema(
  {
    name: { type: String, required: true },
    monthly_price: { type: Number, default: 0 },
    annual_price: { type: Schema.Types.Decimal128, default: '0.00' },
    status: { type: Number, required: true, default: 0 },
    trial_days: { type: Number, required: true, default: 0 },
    max_workspaces: { type: Number, required: true, default: 0 },
    max_users: { type: Number, required: true, default: 0 },
    max_clients: { type: Number, required: true, default: 0 },
    max_projects: { type: Number, required: true, default: 0 },
    description: { type: String, default: null },
    image: { type: String, default: null },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null }
  },
  { versionKey: false }
);

const PlanModel: Model<PlanInterface> = mongoose.model<PlanInterface>('plans', DataSchema);
export default PlanModel;

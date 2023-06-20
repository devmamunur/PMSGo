import mongoose, { Schema } from 'mongoose';
import { WorkspaceInterface } from '../interfaces/workspace.interface';

const DataSchema: Schema<WorkspaceInterface> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'companies', required: true },
    currency: { type: String, required: true, default: '$' },
    interval_time: { type: Number, required: true, default: 10 },
    currency_code: { type: String, default: null },
    company: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zipcode: { type: String, default: null },
    country: { type: String, default: null },
    telephone: { type: String, default: null },
    logo: { type: String, default: null },
    logo_white: { type: String, default: null },
    theme_bg: { type: String, default: null },
    rtl: { type: String, default: null },
    dark_layout: { type: String, default: null },
    theme_color: { type: String, default: null },
    is_stripe_enabled: { type: Number, required: true, default: 0 },
    stripe_key: { type: String, default: null },
    stripe_secret: { type: String, default: null },
    invoice_template: { type: String, default: null },
    invoice_color: { type: String, default: null },
    invoice_footer_title: { type: String, default: null },
    invoice_footer_notes: { type: String, default: null },
    zoom_api_key: { type: String, default: null },
    zoom_api_secret: { type: String, default: null },
    is_active: { type: Number, required: true, default: 1 }
  },
  { versionKey: false }
);
const WorkspaceModel = mongoose.model<WorkspaceInterface>('workspaces', DataSchema);

export default WorkspaceModel;

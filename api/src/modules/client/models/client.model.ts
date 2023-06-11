import mongoose, { Model, Schema } from 'mongoose';
import { ClientInterface } from '../interfaces/client.interface';

const DataSchema: Schema<ClientInterface> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true, default: 'client' },
    currant_workspace: { type: Number, default: null },
    avatar: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zipcode: { type: String, default: null },
    country: { type: String, default: null },
    telephone: { type: String, default: null },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null }
  },
  { versionKey: false }
);

const ClientModel: Model<ClientInterface> = mongoose.model<ClientInterface>('clients', DataSchema);

export default ClientModel;

import { Document } from 'mongoose';

export interface ClientInterface extends Document {
  name: string;
  email: string;
  password?: string | null;
  type?: string | null;
  currant_workspace?: number | null;
  avatar?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  country?: string | null;
  telephone?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

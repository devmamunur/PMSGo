import { Document } from 'mongoose';

export interface ClientInterface extends Document {
  name: string;
  email: string;
  email_verified_at?: Date;
  password?: string;
  remember_token?: string;
  type?: string;
  currant_workspace?: number;
  avatar?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  telephone?: string;
  created_at?: Date;
  updated_at?: Date;
}

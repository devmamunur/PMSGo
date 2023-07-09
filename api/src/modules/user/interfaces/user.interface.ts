import {Document, Types} from 'mongoose';

export interface UserInterface extends Document {
  company : Types.ObjectId;
  name: string;
  email: string;
  password?: string | null;
  type?: string | null;
  currant_workspace: Types.ObjectId | null;
  avatar: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  country: string | null;
  telephone: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface UserWorkspaceInterface{
  user : Types.ObjectId;
  workspace : Types.ObjectId;
}

export interface userCreateInterface{
  company :  string;
  name : string;
  email : string;
  password : string;
}

export interface UpdateProfileRequestBody {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  password?: string;
  photo?: string;
}

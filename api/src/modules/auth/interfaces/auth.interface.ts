import {Document, Types } from 'mongoose';

export interface SignupInterface {
  name: string;
  email: string;
  workspace_name : string;
  password: string;
}

export interface  SigninInterface {
  email: string;
  password: string;
  type : string;
}

export interface  SigninInterface {
  email: string;
  password: string;
}

export interface CompanyDataForToken  extends Document{
  _id : Types.ObjectId;
  name : string;
  email : string;
  type : string;
}

export interface SigninReturnInterface{
  token : string,
  data : CompanyDataForToken;
}

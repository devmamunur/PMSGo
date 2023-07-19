import  { Document, Types } from 'mongoose';

export enum ProjectStatus {
  Ongoing = 'Ongoing',
  Finished = 'Finished',
  Hold = 'Hold',
}


export interface ProjectInterface extends Document{
  name: string;
  status: ProjectStatus;
  description?: string;
  start_date?: Date | null;
  end_date?: Date | null;
  budget?: number;
  workspace: Types.ObjectId;
  created_by: Types.ObjectId;
  is_active: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface UserProjectInterface extends Document {
  user: Types.ObjectId;
  project: Types.ObjectId;
  is_active: number;
  permission?: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface ProjectCreateInterface  {
  name: string;
  status: number;
  description?: string;
  start_date?: Date | null;
  end_date?: Date | null;
  budget: number;
}

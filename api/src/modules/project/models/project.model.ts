import mongoose, { Model, Schema } from 'mongoose';
import {ProjectInterface, ProjectStatus} from '../interfaces/project.interface';

const DataSchema: Schema<ProjectInterface> = new Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(ProjectStatus), default: ProjectStatus.Ongoing },
    description: { type: String },
    start_date: { type: Date, default: null },
    end_date: { type: Date, default: null },
    budget: { type: Number, default: 0 },
    workspace: { type: Schema.Types.ObjectId, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'companies', required: true },
    is_active: { type: Number, required: true, default: 1 },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
  },
  { versionKey: false }
);

const ProjectModel: Model<ProjectInterface> = mongoose.model<ProjectInterface>('projects', DataSchema);

export default ProjectModel;

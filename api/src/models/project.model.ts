import mongoose, {Model, Schema} from 'mongoose';
import {ProjectInterface} from "../interfaces/project.interface";

const DataSchema: Schema<ProjectInterface> = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organizations',
        required: true,
    },
    assignedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks',
    }]
}, {versionKey: false});

const ProjectModel: Model<ProjectInterface> = mongoose.model<ProjectInterface>('projects', DataSchema);

export default ProjectModel;

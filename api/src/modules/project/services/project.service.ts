import {Types} from 'mongoose';
import ProjectModel from '../models/project.model';
import {ProjectCreateInterface} from '../interfaces/project.interface';
import userProjectModel from '../models/user.project.model';
import {Request} from 'express';

class ProjectService{
  async createProjectGetId(req : Request, companyCurrantWorkspaceId : Types.ObjectId) : Promise<Types.ObjectId>{
    try{
      const reqBody : ProjectCreateInterface = req.body;
      const userId = req.currentUser._id;
      const createProject = await ProjectModel.create({
        name : reqBody.name,
        status : reqBody.status,
        description : reqBody.description,
        start_date : reqBody.start_date,
        end_date : reqBody.end_date,
        budget : reqBody.budget,
        workspace : companyCurrantWorkspaceId,
        created_by : userId
      });
      return createProject._id;
    }catch (error){
      throw new Error('Project create failed: '+error.message);
    }
  }
  async createUserProject(reqBody, projectId) : Promise<void>{
    try{
      await userProjectModel.create({
        user : reqBody.user,
        project : projectId,
        created_at : Date.now()
      });
    }catch (error){
      throw new Error('User project create failed: '+error.message);
    }
  }
}

export const projectService : ProjectService = new ProjectService();

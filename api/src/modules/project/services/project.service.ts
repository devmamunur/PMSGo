import {Types} from 'mongoose';
import ProjectModel from '../models/project.model';
import {ProjectCreateInterface} from '../interfaces/project.interface';

class ProjectService{
  async createProjectGetId(reqBody : ProjectCreateInterface) : Promise<Types.ObjectId>{
    try{
      const createProject = await ProjectModel.create({
        name : reqBody.name,
        status : reqBody.status,
        description : reqBody.description,
        start_date : reqBody.start_date,
        end_date : reqBody.end_date,
        budget : reqBody.budget
      });
      return createProject._id;
    }catch (error){
      throw new Error('Project create failed: '+error.message);
    }
  }
}

export const projectService : ProjectService = new ProjectService();

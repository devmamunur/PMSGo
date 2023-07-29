import {Types} from 'mongoose';
import ProjectModel from '../models/project.model';
import {ProjectCreateInterface} from '../interfaces/project.interface';
import userProjectModel from '../models/user.project.model';
import {Request} from 'express';
import projectModel from '../models/project.model';

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
      const users = reqBody.users;
      for(let i = 0; i < users.length; i++){
        await userProjectModel.create({
          user : users[i],
          project : projectId,
          created_at : Date.now()
        });
      }
    }catch (error){
      throw new Error('User project create failed: '+error.message);
    }
  }

  async getAllProjects(companyCurrantWorkspaceId : Types.ObjectId) {
    try{
      return await projectModel.find({workspace : companyCurrantWorkspaceId});
    }catch (error){
      throw new Error('Project get failed: '+error.message);
    }
  }

  async getSingleProject(req : Request){
    try{
      const projectId = req.params.id;
      return  await projectModel.findById(projectId);
    }catch (error){
      throw new Error('Project get failed: '+error.message);
    }
  }
  async delete(req : Request) : Promise<void>{
    try {
      const projectIdsToDelete = req.body.projectIds;
      await ProjectModel.deleteMany({ _id: { $in: projectIdsToDelete } });
    }catch (error){
      throw new Error('Project delete failed: '+error.message);
    }
  }
  async update(req : Request) : Promise<void>{
    const projectId = req.params.id;
    const updateData = req.body;
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      throw new Error('Project not available');
    }
    try{
      const filter = { _id: new Types.ObjectId(projectId) };
      const update = {$set: updateData};
      await ProjectModel.updateOne(filter, update);
    }catch (error){
      throw new Error('Project update failed: '+ error.message);
    }
  }
}

export const projectService : ProjectService = new ProjectService();

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

  async getAllProjects(req : Request, companyCurrantWorkspaceId : Types.ObjectId) {
    try{
      const pageNo = parseInt(req.query.pageNo as string, 10) || 1;
      const perPage = parseInt(req.query.perPage as string, 10) || 10;
      const searchText = req.query.searchText as string || '';
      // Create a pipeline array to hold the aggregation stages
      const pipeline = [];
      // Match projects that belong to the specified workspace
      pipeline.push({
        $match: { workspace: companyCurrantWorkspaceId }
      });
      // Optionally, add a $match stage to search projects by name
      if (searchText) {
        pipeline.push({
          $match: { name: { $regex: searchText, $options: 'i' } }
        });
      }
      // Perform a left outer join with the UserProject collection
      pipeline.push({
        $lookup: {
          from: 'user_projects',
          localField: '_id',
          foreignField: 'project',
          as: 'assigned_users'
        }
      });
      // Perform a second lookup to fetch the user details for each assigned user
      pipeline.push({
        $lookup: {
          from: 'users',
          localField: 'assigned_users.user',
          foreignField: '_id',
          as: 'users'
        }
      });
      // Project only the required fields for the final output
      pipeline.push({
        $project: {
          name: 1,
          status: 1,
          description: 1,
          start_date: 1,
          end_date: 1,
          budget: 1,
          workspace: 1,
          created_by: 1,
          is_active: 1,
          created_at: 1,
          updated_at: 1,
          assigned_users: '$users'
        }
      });
      // Optionally, add pagination stages
      if (pageNo && perPage) {
        const skip = (pageNo - 1) * perPage;
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: perPage });
      }
      // Execute the aggregation pipeline
      return await ProjectModel.aggregate(pipeline);

    }catch (error){
      throw new Error('Project get failed: '+error.message);
    }
  }

  async getSingleProject(projectId : string){
    try{
      return  await projectModel.findById(projectId);
    }catch (error){
      throw new Error('Project get failed: '+error.message);
    }
  }
  async getProjectUsers(projectId : string){
    return {projectId};
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

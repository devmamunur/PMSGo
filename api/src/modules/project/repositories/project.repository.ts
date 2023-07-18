import {Request, Response} from 'express';
import {projectValidator} from '../validations/project.validator';
import {projectService} from '../services/project.service';

class ProjectRepository{
  async create(req : Request, res: Response) : Promise<void>{
    try {
      await projectValidator.createValidate(req.body);
      const projectId = await projectService.createProjectGetId(req.body);
    }catch (error){
      res.status(400).json({error : error.message});
    }
  }
  async get(req : Request, res: Response)  : Promise<void>{

  }
}
export const projectRepository : ProjectRepository = new ProjectRepository();

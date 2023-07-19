import {Request, Response} from 'express';
import {projectValidator} from '../validations/project.validator';
import {projectService} from '../services/project.service';
import {userService} from '../../user/services/user.service';
import {companyService} from '../../company/services/company.service';

class ProjectRepository{
  async create(req : Request, res: Response) : Promise<void>{
    try {
      await projectValidator.createValidate(req.body);
      const companyCurrantWorkspaceId = await companyService.getCompanyCurrantWorkspaceId(req);
      const projectId = await projectService.createProjectGetId(req, companyCurrantWorkspaceId);
      await projectService.createUserProject(req.body, projectId);
      res.status(200).json({message : 'Project create successfully'});
    }catch (error){
      res.status(400).json({error : error.message});
    }
  }
  async get(req : Request, res: Response)  : Promise<void>{

  }
}
export const projectRepository : ProjectRepository = new ProjectRepository();

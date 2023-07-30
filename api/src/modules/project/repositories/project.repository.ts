import {Request, Response} from 'express';
import {projectValidator} from '../validations/project.validator';
import {projectService} from '../services/project.service';
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
    try {
      const companyCurrantWorkspaceId = await companyService.getCompanyCurrantWorkspaceId(req);
      const projects =  await projectService.getAllProjects(req, companyCurrantWorkspaceId);
      res.status(200).json({message : 'Project get successfully', data : projects});
    }catch (error) {
      res.status(400).json({error : error.message});
    }
  }

  async getSingleProject(req : Request, res: Response) : Promise<void>{
    try {
      const project = await projectService.getSingleProject(req);
      res.status(200).json({message : 'Project get successfully', data : project});
    }catch (error){
      res.status(400).json({error : error.message});
    }
  }
  async delete(req : Request, res: Response) : Promise<void>{
    try {
      await projectValidator.deleteValidate(req.body);
      await projectService.delete(req);
      res.status(200).json({message : 'Project delete successfully'});
    }catch (error){
      res.status(400).json({error : error.message});
    }
  }
  async update(req : Request, res: Response) : Promise<void>{
    try {
      await projectValidator.updateValidate(req.body);
      await projectService.update(req);
      res.status(200).json({message : 'Project updated successfully'});
    }catch (error){
      res.status(400).json({error : error.message});
    }
  }
}
export const projectRepository : ProjectRepository = new ProjectRepository();

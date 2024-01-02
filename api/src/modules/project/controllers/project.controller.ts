import {Request, Response} from 'express';
import {projectRepository} from '../repositories/project.repository';

class ProjectController{
  async create(req: Request, res: Response) : Promise<void>{
    await projectRepository.create(req, res);
  }
  async get(req: Request, res: Response) : Promise<void>{
    await projectRepository.get(req, res);
  }
  async getSingleProject(req: Request, res: Response): Promise<void>{
    try {
      const projectId = req.params.id;
      const project = await projectRepository.getSingleProject(projectId);
      if(project){
        res.status(200).json({message : 'Project get successfully', data : project});
      }else {
        res.status(200).json({message : 'Project not available', data : project});
      }
    }catch (error){
      res.status(400).json({error : error});
    }

  }
  async getProjectUsers(req: Request, res: Response): Promise<void>{
    try {
      const projectId = req.params.id || '0';
      const users = await projectRepository.getProjectUsers(projectId);
      if(users){
        res.status(200).json({message : 'User get successfully'});
      }else {
        res.status(200).json({message : 'User not available'});
      }
    }catch (error){
      res.status(400).json({error : error});
    }

  }
  async delete(req: Request, res: Response) : Promise<void>{
    await projectRepository.delete(req, res);
  }
  async update(req: Request, res: Response) : Promise<void>{
    await projectRepository.update(req, res);
  }
}

export const projectController : ProjectController = new ProjectController();

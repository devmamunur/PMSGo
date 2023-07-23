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
    await projectRepository.getSingleProject(req, res);
  }
  async delete(req: Request, res: Response): Promise<void>{
    await projectRepository.delete(req, res);
  }
}

export const projectController : ProjectController = new ProjectController();

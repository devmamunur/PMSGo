import {Request, Response} from 'express';
import {projectRepository} from '../repositories/project.repository';

class ProjectController{
  async get(req: Request, res: Response) : Promise<void>{
    await projectRepository.get(req, res);
  }
  async create(req: Request, res: Response) : Promise<void>{
    await projectRepository.create(req, res);
  }
}

export const projectController : ProjectController = new ProjectController();

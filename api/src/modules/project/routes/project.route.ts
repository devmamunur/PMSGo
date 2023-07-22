import express, {Router} from 'express';
import {authMiddleware} from '../../../global/middleware/auth.middleware';
import {projectController} from '../controllers/project.controller';

class ProjectRoute{
  private readonly router : Router;

  constructor() {
    this.router = express.Router();
  }

  public routes() : Router {
    this.router.get('/projects',  authMiddleware.onlyCompany, projectController.get);
    this.router.post('/projects', authMiddleware.onlyCompany, projectController.create);
    return this.router;
  }

}
export const projectRouter : ProjectRoute = new ProjectRoute();

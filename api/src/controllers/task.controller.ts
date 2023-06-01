import { Request, Response } from 'express';
import TaskRepository from '../repositories/task.repository';

class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const reqBody = req.body;
      reqBody.userId = req.headers['userId'];

      const document = await TaskRepository.createTask(reqBody);

      res.status(200).json({ success: true, data: document });
    } catch (error) {
      res.status(400).json({ success: false, data: error });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const document = await TaskRepository.deleteTask(id);

      res.status(200).json({ success: true, data: document });
    } catch (error) {
      res.status(400).json({ success: false, data: error });
    }
  }

  static async updateTaskStatus(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const status = req.params.status;

      const document = await TaskRepository.updateTaskStatus(id, status);

      res.status(200).json({ success: true, data: document });
    } catch (error) {
      res.status(400).json({ success: false, data: error });
    }
  }

  static async filterTaskByStatus(req: Request, res: Response) {
    try {
      const status = req.params.status;
      const userId = req.headers['userId'];

      const data = await TaskRepository.filterTaskByStatus(status, userId);

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, data: error });
    }
  }

  static async taskStatusCount(req: Request, res: Response) {
    try {
      const userIdValue: string | string[] = req.headers['userId'];
      const userId: string = Array.isArray(userIdValue) ? userIdValue[0] : userIdValue;

      const data = await TaskRepository.taskStatusCount(userId);

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, data: error });
    }
  }

  static async taskList(req: Request, res: Response) {
    try {
      const pageNo = Number(req.params.pageNo);
      const perPage = Number(req.params.perPage);
      const searchValue = req.params.searchKey;

      const { rows, total } = await TaskRepository.taskList(pageNo, perPage, searchValue);

      res.status(200).json({ status: 'success', total, data: rows });
    } catch (error) {
      res.status(400).json({ success: false, data: error });
    }
  }

  static async deleteSelectedTask(req: Request, res: Response) {
    try {
      const ids = req.body.ids;

      const document = await TaskRepository.deleteSelectedTask(ids);

      res.status(200).json({ success: true, data: document });
    } catch (error) {
      res.status(400).json({ success: false, data: error });
    }
  }
}

export default TaskController;

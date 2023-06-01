import express from 'express';
import AuthVerifyMiddleware from '../middleware/auth.middleware';
import TaskController from '../controllers/task.controller';
const taskRouter = express.Router();

taskRouter.post('/task', AuthVerifyMiddleware, TaskController.createTask);
taskRouter.post('/task/delete-selected', AuthVerifyMiddleware, TaskController.deleteSelectedTask);
taskRouter.delete('/task/:id', AuthVerifyMiddleware, TaskController.deleteTask);
taskRouter.get('/task/update/:id/:status', AuthVerifyMiddleware, TaskController.updateTaskStatus);
taskRouter.get('/task/filter/:status', AuthVerifyMiddleware, TaskController.filterTaskByStatus);
taskRouter.get('/task/status-count', AuthVerifyMiddleware, TaskController.taskStatusCount);

taskRouter.get('/task-list/:pageNo/:perPage/:searchKey?', AuthVerifyMiddleware, TaskController.taskList);

export default taskRouter;

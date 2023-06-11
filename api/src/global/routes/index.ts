import { Application } from 'express';
import userRouter from '../../modules/user/routes/user.route';
import otpRoute from '../../modules/otp/routes/otp.route';
import taskRouter from '../../modules/task/routes/task.route';

const appRoutes = (app: Application) => {
  const apiVersion = '/api/v1';
  const routes = () => {
    app.use(apiVersion, userRouter);
    app.use(apiVersion, otpRoute);
    app.use(apiVersion, taskRouter);
  };
  routes();
};
export default appRoutes;

import { Application } from 'express';
import userRouter from '../../modules/user/routes/user.route';
import otpRoute from '../../modules/otp/routes/otp.route';
import taskRouter from '../../modules/task/routes/task.route';

const appRoutes = (app: Application) => {
  const routes = () => {
    app.use('/api/v1', userRouter);
    app.use('/api/v1', otpRoute);
    app.use('/api/v1', taskRouter);
  };
  routes();
};
export default appRoutes;

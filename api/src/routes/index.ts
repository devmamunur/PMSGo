import { Application } from 'express';
import userRouter from './user.route';
import otpRoute from './otp.route';
import taskRouter from './task.route';

const appRoutes = (app: Application) => {
  const routes = () => {
    app.use('/api/v1', userRouter);
    app.use('/api/v1', otpRoute);
    app.use('/api/v1', taskRouter);
  };
  routes();
};
export default appRoutes;

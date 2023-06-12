import { Application } from 'express';
import {authRouter} from "../../modules/auth/routes/auth.route";

const apiVersion = '/api/v1';

const appRoutes = (app: Application) => {

  const routes = () => {
    app.use(apiVersion, authRouter.routes());
  };
  routes();
};
export default appRoutes;

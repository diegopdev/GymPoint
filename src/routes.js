import { Router } from 'express';

/**
 * Controllers
 */
import UserAdminController from './app/controllers/UserAdminController';

const routes = new Router();

routes.post('/userAdmin', UserAdminController.store);

export default routes;

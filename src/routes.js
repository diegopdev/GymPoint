import { Router } from 'express';

/**
 * Controllers
 */
import UserAdminController from './app/controllers/UserAdminController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/userAdmin', UserAdminController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);
routes.get('/students', StudentsController.index);

export default routes;

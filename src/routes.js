import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

// Importando controller
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.post('/session', SessionController.store);

// Using auth middleware
routes.use(authMiddleware);

// Route recipients
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:id', RecipientController.update);

export default routes;

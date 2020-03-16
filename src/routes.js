import { Router } from 'express';

// Importando controller
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/session', SessionController.store);

export default routes;

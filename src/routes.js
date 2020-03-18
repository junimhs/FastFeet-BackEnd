import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

// Importando controller
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import AvatarController from './app/controllers/AvatarController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

// Using auth middleware
routes.use(authMiddleware);

// Route recipients
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:id', RecipientController.update);

// Route avatar deliveryman
routes.post('/avatar', upload.single('avatar'), AvatarController.store);

export default routes;

import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

// Importando controller
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import AvatarController from './app/controllers/AvatarController';
import DeliverymanController from './app/controllers/DeliverymanController';

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

// Route deliveryman
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

export default routes;

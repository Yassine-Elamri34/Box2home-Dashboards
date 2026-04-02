import express from 'express';
// import validationMiddleware from '@src/shared/middleware/validation.middleware';
import authController from '../controllers/auth.controller';

const routes = express.Router();

routes.post('/login', authController.loginController);
routes.post('/register', authController.registerController);

export default routes;

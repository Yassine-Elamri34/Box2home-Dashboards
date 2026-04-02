import express from 'express';
// import validationMiddleware from '@src/shared/middleware/validation.middleware';
import usersController from '../controllers/users.controller';

const routes = express.Router();

routes.get(
       '/list',

       usersController.getUsersList
);
// routes.post('/assign', authController.registerController);

export default routes;

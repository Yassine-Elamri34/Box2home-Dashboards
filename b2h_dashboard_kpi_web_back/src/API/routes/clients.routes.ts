import express from 'express';
// import validationMiddleware from '@src/shared/middleware/validation.middleware';
import clientControllers from '../controllers/client.controllers';

const routes = express.Router();

// Define routes for client CRUD operations
routes.post('/', clientControllers.createClient);
routes.get('/all', clientControllers.getAllClients);
routes.get('/:clientId', clientControllers.getClientById);
routes.put('/:clientId', clientControllers.updateClient);
routes.delete('/:clientId', clientControllers.deleteClient);

export default routes;

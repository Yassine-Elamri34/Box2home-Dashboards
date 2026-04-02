import express from 'express';
// import validationMiddleware from '@src/shared/middleware/validation.middleware';
import statesController from '../controllers/states.controller';

const routes = express.Router();

routes.get('/global', statesController.getGlobalKPI);
routes.get('/sales-channel/:channelLabel', statesController.getKPIByChannelLabel);

export default routes;

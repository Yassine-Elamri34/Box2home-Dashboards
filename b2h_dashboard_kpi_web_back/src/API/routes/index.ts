import express from 'express';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import clientsRoutes from './clients.routes';
import statesRoutes from './states.routes';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/kpi', statesRoutes);
routes.use('/clients', clientsRoutes);

export default routes;

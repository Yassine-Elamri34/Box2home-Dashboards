import 'color';

import cors from 'cors';
import path from 'path';
import http from 'http';
import morgan from 'morgan';
import express from 'express';

//import docs from '@docs';
import config from '@config';
import routes from 'src/API/routes';

//import { handleAppProcessExists } from '@helpers/process.helpers';

const app = express();
// enable cors
app.use(cors(config.corsOptions));

app.use(morgan('tiny'));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/')));

// mount routes index with app
app.use('/api/v1', routes);

// mount swagger documentations with current running app
// docs(app, config.appCredentials.currentApp.docs.baseUrl);

//Handle server start errors
// handleAppProcessExists();
export { app };
export const server = http.createServer({}, app);
